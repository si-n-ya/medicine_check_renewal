<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMedicineRequest;
use App\Http\Requests\UpdateMedicineRequest;
use App\Http\Resources\MedicineEditResource;
use App\Http\Resources\MedicineRecordResource;
use App\Http\Resources\MedicineResource;
use App\Models\Medicine;
use App\Models\MedicineLog;
use App\Models\MedicineTime;
use App\Services\Medicine\CreateMedicineService;
use App\Services\Medicine\UpdateMedicineService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

    public function getMedicinesOfday(Request $request)
    {
        $day = $request->input('date');
        Log::debug($day);
        Log::debug($request->all());
        try {
            $carbon = new Carbon($day);
        } catch (Exception $e) {
            $carbon = Carbon::now();
        }
        Log::debug($carbon);
        $week = $carbon->dayOfWeek;
        Log::debug($week);

        // $medicines = Medicine::with('unit')
        //     ->with('medicine_times')
        //     ->with('medicine_days')
        //     ->where('medicine_days.day_of_week_id', $week + 1)
        //     ->get();

        // TODO start_date以降のお薬一覧を取得する
        $medicines = Medicine::with('unit', 'medicineTimes', 'medicineDays')
        ->whereHas('medicineDays', function ($query) use ($week) {
            $query->where('day_of_week_id', $week + 1);
        })
        ->get();
        return MedicineRecordResource::collection($medicines);
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

    public function updateRecordMedicine(Request $request, MedicineTime $medicine_time) {
        Log::debug('updateRecordMedicine');
        Log::debug($medicine_time);
        Log::debug($request);
        // TODO すでに登録されている場合は、「すでにチェックされていることをエラーで返す」
        // TODO 削除時の検討（フラグを立てるのみで良さそう）
        try {
            $medicine_log = new MedicineLog();
            $medicine_log->fill([
                'medicine_time_id' => $medicine_time->id,
                'name' => $medicine_time->medicine->name,
                'time' => $medicine_time->time_of_day,
                'date_taken' => $request->date,
                'amount_taken' => $medicine_time->medicine->dose_amount,// TODO 入力可能にする
            ])->save();
            return response()->json(['success' => 'チェックに成功しました。']);
        } catch (Exception $e) {
            Log::error($e);
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