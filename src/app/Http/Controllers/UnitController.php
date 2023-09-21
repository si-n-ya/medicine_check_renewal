<?php

namespace App\Http\Controllers;

use App\Http\Resources\UnitResource;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function fetch()
    {
        $units = Unit::get();
        return UnitResource::collection($units);
    }
}