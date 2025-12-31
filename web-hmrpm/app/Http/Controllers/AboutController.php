<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\AboutSetting;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $background = AboutSetting::where('key', 'about_hero_bg')->first();

        return Inertia::render('About', [
            'background' => $background
        ]);
    }
}
