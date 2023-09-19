<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicationTime extends Model
{
    use HasFactory;

    protected $fillable = [
        'medication_id', 'time_of_day'
    ];

    protected $casts = [
        'time_of_day' => 'time',
    ];

    public function medication()
    {
        return $this->belongsTo(Medication::class);
    }
}