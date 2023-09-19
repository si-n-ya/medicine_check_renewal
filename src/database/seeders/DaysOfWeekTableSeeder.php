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
        $weeks = ['日', '月', '火', '水', '木', '金', '土', '毎日'];
        foreach($weeks as $val) {
            $bulkInsertArray[] = ['day_name' => $val];
        }
        
        DB::table('days_of_week')->insert($bulkInsertArray);
    }
}