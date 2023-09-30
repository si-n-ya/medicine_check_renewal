<?php

namespace Tests\Feature\Medicines;

use App\Models\DayOfWeek;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Medicine;
use App\Models\Unit;

class CreateMedicineTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * @test
     * 薬の登録が成功するかテスト
     */
    public function store_medicine_success()
    {
        // テスト用に薬の単位のレコードを追加
        $unit = Unit::factory()->create();

        // テスト用に服用曜日のレコードを複数追加
        $daysOfWeek = DayOfWeek::factory()->count(3)->create();

        $data = [
            'unit_id' => $unit->id,
            'name' => 'Test Medicine',
            'start_date' => '2023-09-28',
            'dose_amount' => 0.25,
            'stock_amount' => 100000,
            'day_of_weeks' => $daysOfWeek->pluck('id')->toArray(),
            'times' => [0, 12, 23]
        ];

        $response = $this->postJson('/api/medicines', $data);

        // レスポンスのステータスコードを検証
        $response->assertStatus(200);

        // データベースに正しいデータが保存されているか検証
        $this->assertDatabaseHas('medicines', [
            'unit_id' => $data['unit_id'],
            'name' => $data['name'],
            'dose_amount' => $data['dose_amount'],
            'stock_amount' => $data['stock_amount'],
        ]);

        // DBに保存されたDATE型のstart_dateの取得は、「Y-m-d H:i:s」形式で取得されるため、独立して検証
        $medicine = Medicine::first();
        $this->assertEquals($data['start_date'], $medicine->start_date->toDateString());

        // 登録された薬のデータを取得し、曜日と時間が正しいか、レコードの数が正しいか検証
        $this->assertCount(count($data['day_of_weeks']), $medicine->daysOfWeek);
        $this->assertEquals($data['day_of_weeks'], $medicine->daysOfWeek->pluck('id')->toArray());

        $this->assertCount(count($data['times']), $medicine->medicineTimes);
        $this->assertEquals($data['times'], $medicine->medicineTimes->pluck('time_of_day')->toArray());
    }
}