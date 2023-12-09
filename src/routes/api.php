<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::apiResource('medicines', 'App\Http\Controllers\MedicineController');
Route::put('medicines/record/{medicine_time}', ['App\Http\Controllers\MedicineController', 'updateRecordMedicine']);
Route::get('medicinesOfday', ['App\Http\Controllers\MedicineController', 'getMedicinesOfday']);
Route::get('daysOfWeek', ['App\Http\Controllers\DayOfWeekController', 'fetch']);
Route::get('medicineUnits', ['App\Http\Controllers\UnitController', 'fetch']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});