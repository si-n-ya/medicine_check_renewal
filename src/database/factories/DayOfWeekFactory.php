<?php

namespace Database\Factories;

use App\Models\DayOfWeek;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DayOfWeek>
 */
class DayOfWeekFactory extends Factory
{
    protected $model = DayOfWeek::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'day_name' => $this->faker->unique()->dayOfWeek,
        ];
    }
}