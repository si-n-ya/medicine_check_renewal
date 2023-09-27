<?php
namespace App\Services\Medicine;

use App\Models\Medicine;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CreateMedicineService
{
    /**
     * お薬の登録
     *
     * @param \Illuminate\Http\Request
     * @throws \Exception
     */
    public function handle(Request $request)
    {
      Log::debug($request->all());
      try {
          DB::beginTransaction();
          
          $medicine = Medicine::create($request->all());
          
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
          throw new Exception('登録に失敗しました。');
      }
    }
}