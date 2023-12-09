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
        'time_of_day' => 'int',
    ];

    public function medicine()
    {
        return $this->belongsTo(Medicine::class);
    }

    // MedicineLog へのリレーションは一対一の関係
    // 外部キーを持たないモデル（MedicineTime）は hasOne リレーションを使用
    public function medicineLog()
    {
        return $this->hasOne(MedicineLog::class);
    }
}