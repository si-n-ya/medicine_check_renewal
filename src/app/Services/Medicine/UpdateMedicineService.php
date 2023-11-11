<?php
namespace App\Services\Medicine;

use App\Models\Medicine;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateMedicineService
{
    /**
     * お薬の登録
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Medicine $medicine
     * @throws \Exception
     */
    public function handle(Request $request, Medicine $medicine)
    {
      Log::debug($medicine);
      Log::debug($request->all());
      try {
          DB::beginTransaction();
          
          $medicine->update($request->all());
          
          $medicine->daysOfWeek()->sync($request->day_of_weeks);
          
          // 登録されている時刻データを取得
          $currentTimes = $medicine->medicineTimes->pluck('time_of_day')->toArray();
          // チェックから外された不要な時刻データを削除
          foreach ($currentTimes as $currentTime) {
            if (!in_array($currentTime, $request->times)) {
                $medicine->medicineTimes()->where('time_of_day', $currentTime)->delete();
            }
          }

          // 時刻を更新 or 新しく登録
          foreach ($request->times as $time) {
              $medicine->medicineTimes()->updateOrCreate([
                  'time_of_day' => $time,
              ]);
          }
      
          DB::commit();
      } catch (Exception $e) {
          DB::rollback();
          Log::error($e->getMessage());
          throw new Exception('更新に失敗しました。');
      }
    }
}