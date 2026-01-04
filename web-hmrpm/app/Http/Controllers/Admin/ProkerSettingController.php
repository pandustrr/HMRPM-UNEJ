<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProkerSetting;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProkerSettingController extends Controller
{
    public function index()
    {
        $settings = ProkerSetting::where('key', 'proker_hero_bg')->first();
        return Inertia::render('Admin/Proker/Index-Proker', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'type' => 'required|in:image,video',
            'file' => 'nullable|file|max:20480', // 20MB max
        ]);

        $setting = ProkerSetting::firstOrCreate(['key' => 'proker_hero_bg'], [
            'type' => 'image',
            'value' => '/storage/logo/about-hero-bg.png', // Use same default or a specific one? Assuming generic fallback for now.
            'is_active' => true
        ]);

        if ($request->hasFile('file')) {
            // Delete old file if it exists and is not the default
            if ($setting->value && !str_contains($setting->value, 'about-hero-bg.png')) { // Reuse checking logic or maybe safer to just check generic 'default' keyword?
                // Let's stick to simple check: if it's not the newly set one. 
                // Actually, let's just use the same logic as AboutSetting for consistency.
                Storage::disk('public')->delete(str_replace('/storage/', '', $setting->value));
            }

            $path = $request->file('file')->store('proker', 'public');
            $setting->value = Storage::url($path);
        }

        $setting->type = $request->type;
        $setting->save();

        return back()->with('success', 'Background Proker berhasil diperbarui.');
    }

    public function destroy()
    {
        $setting = ProkerSetting::where('key', 'proker_hero_bg')->first();

        if ($setting) {
            // Delete file from storage if not default
            if ($setting->value && !str_contains($setting->value, 'about-hero-bg.png')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $setting->value));
            }
            $setting->delete();
        }

        return back()->with('success', 'Background Proker berhasil dihapus (dikembalikan ke default).');
    }
}
