<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMedicineRequest;
use App\Http\Requests\UpdateMedicineRequest;
use App\Http\Resources\MedicineEditResource;
use App\Http\Resources\MedicineResource;
use App\Models\Medicine;
use App\Services\Medicine\CreateMedicineService;
use Exception;
use GuzzleHttp\Psr7\Request;

class MedicineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medicines = Medicine::with('unit')->orderByDesc('id')->get();
        return MedicineResource::collection($medicines);
    }

    /**
     * Store a newly created medicine in storage.
     *
     * @param  \App\Http\Requests\StoreMedicineRequest  $request
     * @param  \App\Services\Medicine\CreateMedicineService  $createMedicineService
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreMedicineRequest $request, CreateMedicineService $createMedicineService)
    {
        try {
            $createMedicineService->handle($request);
            return response()->json(['success' => '登録に成功しました。']);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Medicine $medicine)
    {
        $medicine->load('daysOfWeek', 'medicineTimes'); // 関連データをロード
        return new MedicineEditResource($medicine);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Medicine $medicine)
    {
        Log::debug($request->all());
        try {
            DB::beginTransaction();
            
            $medicine->update($request->all());
            
            $medicine->daysOfWeek()->sync($request->day_of_weeks);
            foreach ($request->times as $time) {
                $medicine->medicineTimes()->create([
                    'time_of_day' => $time,
                ]);
            }
        
            DB::commit();
            return response()->json(['success' => '更新に成功しました。']);
        } catch (Exception $e) {
            DB::rollback();
            Log::error($e->getMessage());
            throw new Exception('登録に失敗しました。');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Medicine $medicine)
    {
        return $medicine->delete()
        ? response()->json($medicine)
        : response()->json($medicine, 500);
    }
}