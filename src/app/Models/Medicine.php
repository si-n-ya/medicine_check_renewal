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
        // 中間テーブル（medicine_days）のcreated_at、update_atを自動的に更新
        return $this->belongsToMany(DayOfWeek::class, 'medicine_days')->withTimestamps();
    }

    public function medicineDays()
    {
        // 中間テーブル（medicine_days）のcreated_at、update_atを自動的に更新
        // hasManyの第二引数は外部キーを指定する
        return $this->hasMany(MedicineDay::class, 'medicine_id');
    }

    public function medicineTimes()
    {
        return $this->hasMany(MedicineTime::class);
    }
}