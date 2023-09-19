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

    public function medicines()
    {
        return $this->belongsToMany(Medicine::class, 'medicine_days');
    }
}