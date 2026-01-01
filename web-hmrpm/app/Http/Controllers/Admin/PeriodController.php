<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Period;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PeriodController extends Controller
{
    public function index()
    {
        $periods = Period::orderBy('year', 'desc')->get();
        return Inertia::render('Admin/Periods/Index-Period', [
            'periods' => $periods
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|string|unique:periods,year',
            'hero_image' => 'nullable|image|max:2048',
            'theme_color' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('hero_image')) {
            $path = $request->file('hero_image')->store('periods', 'public');
            $validated['hero_image'] = '/storage/' . $path;
        }

        if ($validated['is_active'] ?? false) {
            // Deactivate others
            Period::where('is_active', true)->update(['is_active' => false]);
        }

        Period::create($validated);

        return redirect()->route('admin.periods.index')->with('success', 'Periode berhasil ditambahkan.');
    }

    public function update(Request $request, Period $period)
    {
        $validated = $request->validate([
            'year' => 'required|string|unique:periods,year,' . $period->id,
            'hero_image' => 'nullable|image|max:2048', // optional on update
            'theme_color' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('hero_image')) {
            // Delete old
            if ($period->hero_image) {
                // remove /storage/ prefix
                $oldPath = str_replace('/storage/', '', $period->hero_image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('hero_image')->store('periods', 'public');
            $validated['hero_image'] = '/storage/' . $path;
        }

        if ($validated['is_active'] ?? false) {
            Period::where('id', '!=', $period->id)->update(['is_active' => false]);
        }

        $period->update($validated);

        return redirect()->route('admin.periods.index')->with('success', 'Periode berhasil diperbarui.');
    }

    public function destroy(Period $period)
    {
        if ($period->hero_image) {
            $oldPath = str_replace('/storage/', '', $period->hero_image);
            Storage::disk('public')->delete($oldPath);
        }
        $period->delete();
        return redirect()->route('admin.periods.index')->with('success', 'Periode berhasil dihapus.');
    }

    public function setActive(Period $period)
    {
        Period::where('is_active', true)->update(['is_active' => false]);
        $period->update(['is_active' => true]);
        return back()->with('success', 'Periode aktif diperbarui.');
    }
}
