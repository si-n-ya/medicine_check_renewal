<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicineRecordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'unit_id' => $this->unit_id,
            'unit' => $this->unit,
            'name' => $this->name,
            'start_date' => $this->start_date,
            'dose_amount' => $this->dose_amount,
            'stock_amount' => $this->stock_amount,
            'medicine_times' => $this->medicineTimes,
            'medicine_days' => $this->medicineDays,
        ];
    }
}