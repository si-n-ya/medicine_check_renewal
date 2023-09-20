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
        // 中間テーブル（medicine_days）のcreated_at、update_atを自動的に更新
        return $this->belongsToMany(Medicine::class, 'medicine_days')->withTimestamps();
    }
}