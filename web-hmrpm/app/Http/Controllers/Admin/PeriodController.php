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
        $periods = Period::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Periods/Index-Period', [
            'periods' => $periods
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|string|unique:periods,year',
            'hero_image' => 'nullable|file|max:20480', // 20MB
            'hero_type' => 'nullable|in:image,video',
            'theme_color' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['is_active'])) {
            $validated['is_archived'] = !$validated['is_active'];
        } else {
            $validated['is_active'] = false;
            $validated['is_archived'] = true;
        }

        // Multi-period active supported: no longer deactivating others

        if ($request->hasFile('hero_image')) {
            $path = $request->file('hero_image')->store('periods', 'public');
            $validated['hero_image'] = '/storage/' . $path;

            // Auto detect type if not provided
            if (!isset($validated['hero_type'])) {
                $extension = strtolower($request->file('hero_image')->getClientOriginalExtension());
                if (in_array($extension, ['mp4', 'webm', 'ogg', 'mov'])) {
                    $validated['hero_type'] = 'video';
                } else {
                    $validated['hero_type'] = 'image';
                }
            }
        }

        // Multi-period active supported: no longer deactivating others

        Period::create($validated);

        return redirect()->route('admin.periods.index')->with('success', 'Periode berhasil ditambahkan.');
    }

    public function update(Request $request, Period $period)
    {
        $validated = $request->validate([
            'year' => 'required|string|unique:periods,year,' . $period->id,
            'hero_image' => 'nullable|file|max:20480', // 20MB
            'hero_type' => 'nullable|in:image,video',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['is_active'])) {
            $validated['is_archived'] = !$validated['is_active'];
        }

        if ($request->hasFile('hero_image')) {
            // Delete old
            if ($period->hero_image) {
                $oldPath = str_replace('/storage/', '', $period->hero_image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('hero_image')->store('periods', 'public');
            $validated['hero_image'] = '/storage/' . $path;

            // Auto detect type if not provided
            if (!isset($validated['hero_type']) || $validated['hero_type'] == $period->hero_type) {
                $extension = strtolower($request->file('hero_image')->getClientOriginalExtension());
                if (in_array($extension, ['mp4', 'webm', 'ogg', 'mov'])) {
                    $validated['hero_type'] = 'video';
                } else {
                    $validated['hero_type'] = 'image';
                }
            }
        }

        // Multi-period active supported: no longer deactivating others

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

    public function toggleActive(Period $period)
    {
        $newState = !$period->is_active;
        $period->update([
            'is_active' => $newState,
            'is_archived' => !$newState
        ]);

        return back()->with('success', 'Status periode diperbarui.');
    }
}
