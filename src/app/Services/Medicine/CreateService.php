<?php
namespace App\Services\Medicine;

use App\Models\Medicine;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CreateService
{
    /**
     *
     */
    public function handle(Request $request)
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
    }
}