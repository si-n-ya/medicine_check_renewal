<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicineLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'medicine_id', 'day_of_week_id'
    ];

    public function medicine()
    {
        return $this->belongsTo(Medicine::class);
    }
}