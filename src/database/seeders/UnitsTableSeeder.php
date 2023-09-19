<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $units = ['錠', '包', 'mg', 'ml'];
        foreach($units as $val) {
            $bulkInsertArray[] = ['unit_name' => $val];
        }
        
        DB::table('units')->insert($bulkInsertArray);
    }
}