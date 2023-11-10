<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicineEditResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'unit_id' => $this->unit_id,
            'start_date' => $this->start_date->format('Y-m-d'),
            'dose_amount' => $this->dose_amount,
            'stock_amount' => $this->stock_amount,
            'day_of_weeks' => $this->daysOfWeek ? $this->daysOfWeek->pluck('id') : [], // IDの配列を返す
            'times' => $this->medicineTimes ? $this->medicineTimes->pluck('time_of_day') : [], // time_of_dayの配列を返す
        ];
    }
}