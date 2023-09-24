<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMedicineRequest;
use App\Http\Requests\UpdateMedicineRequest;
use App\Models\Medicine;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MedicineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMedicineRequest $request)
    {
        Log::debug($request->all());
        try {
            DB::beginTransaction();
            
            $medicine = new Medicine();
            $medicine->fill([
                'unit_id' => $request->unit_id,
                'name' => $request->name,
                'start_date' => $request->start_date,
                'dose_amount' => $request->dose_amount,
                'stock_amount' => $request->stock_amount,
            ])->save();

            $medicine->daysOfWeek()->sync($request->day_of_weeks);
            foreach ($request->times as $time) {
                $medicine->medicineTimes()->create([
                    'time_of_day' => $time,
                ]);
            }
        
            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            Log::error($e->getMessage());
            return response()->json(['error' => '登録に失敗しました。'], 500);
        }

        return $medicine
        ? response()->json($medicine, 201)
        : response()->json($medicine, 500);
    }

    /**
     * Display the specified resource.
     */
    public function show(Medicine $medicine)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Medicine $medicine)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMedicineRequest $request, Medicine $medicine)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Medicine $medicine)
    {
        //
    }
}