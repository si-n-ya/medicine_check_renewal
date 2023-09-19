<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'name', 'unit_id', 'start_date', 'dose_amount', 'stock_amount'
    ];

    protected $casts = [
        'start_date' => 'date',
    ];


    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function daysOfWeek()
    {
        return $this->belongsToMany(DayOfWeek::class, 'medication_days');
    }

    public function medicationTimes()
    {
        return $this->hasMany(MedicationTime::class);
    }
}