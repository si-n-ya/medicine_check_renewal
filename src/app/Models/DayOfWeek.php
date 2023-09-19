<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DayOfWeek extends Model
{
    use HasFactory;

    protected $fillable = [
        'day_name'
    ];

    public function medications()
    {
        return $this->belongsToMany(Medication::class, 'medication_days');
    }
}