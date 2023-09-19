<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicineTime extends Model
{
    use HasFactory;

    protected $fillable = [
        'medicine_id', 'time_of_day'
    ];

    protected $casts = [
        'time_of_day' => 'time',
    ];

    public function medicine()
    {
        return $this->belongsTo(Medicine::class);
    }
}