<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalBlogs' => \App\Models\Blog::count(),
                'totalProkers' => \App\Models\ProgramKerja::count(),
                'totalMembers' => \App\Models\DivisionMember::count(),
                'totalAcademics' => \App\Models\Academic::count(),
                'totalDivisions' => \App\Models\Division::count(),
            ],
            'recentActivities' => \App\Models\Blog::latest()->take(5)->get(['id', 'title', 'created_at'])
        ]);
    }
}
