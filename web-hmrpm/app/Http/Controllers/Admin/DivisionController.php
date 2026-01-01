<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Division;
use App\Models\Period;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DivisionController extends Controller
{
    public function dashboard()
    {
        $periodsCount = Period::count();
        $divisionsCount = Division::count();
        $membersCount = \App\Models\DivisionMember::count();

        return Inertia::render('Admin/Divisions/Dashboard-Division', [
            'periodsCount' => $periodsCount,
            'divisionsCount' => $divisionsCount,
            'membersCount' => $membersCount
        ]);
    }

    public function index(Request $request)
    {
        $periods = Period::orderBy('year', 'desc')->get();
        $selectedPeriodId = $request->query('period_id');

        if (!$selectedPeriodId) {
            $activePeriod = $periods->firstWhere('is_active', true) ?? $periods->first();
            $selectedPeriodId = $activePeriod ? $activePeriod->id : null;
        }

        $divisions = [];
        if ($selectedPeriodId) {
            $divisions = Division::where('period_id', $selectedPeriodId)->with('members')->get();
        }

        return Inertia::render('Admin/Divisions/Index-Division', [
            'periods' => $periods,
            'selectedPeriodId' => (int)$selectedPeriodId,
            'divisions' => $divisions
        ]);
    }

    public function create(Request $request)
    {
        $periods = Period::orderBy('year', 'desc')->get();
        $selectedPeriodId = $request->query('period_id');
        return Inertia::render('Admin/Divisions/Create-Division', [
            'periods' => $periods,
            'selectedPeriodId' => (int)$selectedPeriodId
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'period_id' => 'required|exists:periods,id',
            'name' => 'required|string',
            'short_desc' => 'required|string',
            'description' => 'required|string',
            'icon_image' => 'required|image|max:2048',
            'image' => 'required|image|max:2048',
            'color' => 'required|string',
        ]);

        if ($request->hasFile('icon_image')) {
            $path = $request->file('icon_image')->store('divisions/icons', 'public');
            $validated['icon_image'] = '/storage/' . $path;
        }
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('divisions/images', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        Division::create($validated);

        return redirect()->route('admin.divisions.index', ['period_id' => $validated['period_id']])->with('success', 'Divisi berhasil ditambahkan.');
    }

    public function edit(Division $division)
    {
        $division->load(['members', 'period']);
        return Inertia::render('Admin/Divisions/Edit-Division', [
            'division' => $division
        ]);
    }

    public function update(Request $request, Division $division)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'short_desc' => 'required|string',
            'description' => 'required|string',
            'icon_image' => 'nullable|image|max:2048',
            'image' => 'nullable|image|max:2048',
            'color' => 'required|string',
        ]);

        if ($request->hasFile('icon_image')) {
            if ($division->icon_image) Storage::disk('public')->delete(str_replace('/storage/', '', $division->icon_image));
            $path = $request->file('icon_image')->store('divisions/icons', 'public');
            $validated['icon_image'] = '/storage/' . $path;
        }
        if ($request->hasFile('image')) {
            if ($division->image) Storage::disk('public')->delete(str_replace('/storage/', '', $division->image));
            $path = $request->file('image')->store('divisions/images', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $division->update($validated);

        return redirect()->back()->with('success', 'Divisi berhasil diperbarui.');
    }

    public function destroy(Division $division)
    {
        $periodId = $division->period_id;
        if ($division->icon_image) Storage::disk('public')->delete(str_replace('/storage/', '', $division->icon_image));
        if ($division->image) Storage::disk('public')->delete(str_replace('/storage/', '', $division->image));
        $division->delete();

        return redirect()->route('admin.divisions.index', ['period_id' => $periodId])->with('success', 'Divisi berhasil dihapus.');
    }
}
