<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DaysOfWeekTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $weeks = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '毎日'];
        foreach($weeks as $val) {
            $bulkInsertArray[] = ['day_name' => $val];
        }
        
        DB::table('days_of_week')->insert($bulkInsertArray);
    }
}