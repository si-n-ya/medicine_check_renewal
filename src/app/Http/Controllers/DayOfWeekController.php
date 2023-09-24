<?php

namespace App\Http\Controllers;

use App\Http\Resources\DayOfWeekResource;
use App\Models\DayOfWeek;
use Illuminate\Http\Request;

class DayOfWeekController extends Controller
{
    public function fetch()
    {
        $days_of_week = DayOfWeek::orderBy('id', 'asc')->get();
        return DayOfWeekResource::collection($days_of_week);
    }
}