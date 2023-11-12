<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMedicineRequest;
use App\Http\Requests\UpdateMedicineRequest;
use App\Http\Resources\MedicineEditResource;
use App\Http\Resources\MedicineResource;
use App\Models\Medicine;
use App\Services\Medicine\CreateMedicineService;
use App\Services\Medicine\UpdateMedicineService;
use Exception;

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
     * Store a newly updated medicine in storage.
     *
     * @param  \App\Http\Requests\UpdateMedicineRequest  $request
     * @param  \App\Models\Medicine $medicine
     * @param  \App\Services\Medicine\UpdateMedicineService  $updateMedicineService
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateMedicineRequest $request, Medicine $medicine, UpdateMedicineService $updateMedicineService)
    {
        try {
            $updateMedicineService->handle($request, $medicine);
            return response()->json(['success' => '更新に成功しました。']);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
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