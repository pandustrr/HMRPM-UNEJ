<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\HomeSetting;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class HomeSettingController extends Controller
{
    public function index()
    {
        $settings = HomeSetting::where('key', 'home_hero_bg')->first();
        return Inertia::render('Admin/Home/Index-Home', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'type' => 'required|in:image,video',
            'file' => 'nullable|file|max:20480', // 20MB max
        ]);

        $setting = HomeSetting::firstOrCreate(['key' => 'home_hero_bg'], [
            'type' => 'image',
            'value' => '/storage/logo/about-hero-bg.png', // Default fallback
            'is_active' => true
        ]);

        if ($request->hasFile('file')) {
            // Delete old file if it exists and is not the default
            if ($setting->value && !str_contains($setting->value, 'about-hero-bg.png')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $setting->value));
            }

            $path = $request->file('file')->store('home', 'public');
            $setting->value = Storage::url($path);
        }

        $setting->type = $request->type;
        $setting->save();

        return back()->with('success', 'Background Beranda berhasil diperbarui.');
    }

    public function destroy()
    {
        $setting = HomeSetting::where('key', 'home_hero_bg')->first();

        if ($setting) {
            // Delete file from storage if not the default
            if ($setting->value && !str_contains($setting->value, 'about-hero-bg.png')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $setting->value));
            }

            $setting->delete();
        }

        return back()->with('success', 'Background Beranda berhasil dihapus (dikembalikan ke default).');
    }
}
