<?php

namespace App\Http\Controllers;

use App\Models\Period;
use App\Models\Division;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DivisionController extends Controller
{
    public function index(Request $request)
    {
        // 1. Get all periods (descending order)
        $periods = Period::orderBy('year', 'desc')->get();

        // 2. Determine active period (Query param OR Active flag OR Lastest)
        $selectedYear = $request->query('period');

        if ($selectedYear) {
            $activePeriod = $periods->firstWhere('year', $selectedYear);
        } else {
            $activePeriod = $periods->firstWhere('is_active', true) ?? $periods->first();
        }

        // 3. Get Divisions with Members for the active period
        $divisions = [];
        if ($activePeriod) {
            $divisions = Division::where('period_id', $activePeriod->id)
                ->with(['members'])
                ->get();
        }

        // 4. Render
        return Inertia::render('Divisi', [
            'periods' => $periods->pluck('year'),
            'currentPeriod' => $activePeriod ? $activePeriod->year : '',
            'activePeriodData' => $activePeriod, // Contains hero_image, theme_color
            'divisions' => $divisions
        ]);
    }
}
