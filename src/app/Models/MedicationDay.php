<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicationDay extends Model
{
    use HasFactory;

    protected $fillable = [
        'medication_id', 'day_of_week_id'
    ];

    public function medication()
    {
        return $this->belongsTo(Medication::class);
    }

    public function dayOfWeek()
    {
        return $this->belongsTo(DayOfWeek::class);
    }
}