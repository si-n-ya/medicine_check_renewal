<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicineLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'medicine_time_id', 'name', 'time', 'date_taken', 'amount_taken',
    ];

    // 外部キーを持つモデル（MedicineLog）は belongsTo リレーションを使用
    public function medicineTime()
    {
        return $this->belongsTo(medicineTime::class);
    }
}