<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMedicineRequest;
use App\Http\Requests\UpdateMedicineRequest;
use App\Http\Resources\MedicineResource;
use App\Models\Medicine;
use App\Services\Medicine\CreateMedicineService;
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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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