<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\AboutSetting;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AboutSettingController extends Controller
{
    public function index()
    {
        $settings = AboutSetting::where('key', 'about_hero_bg')->first();
        return Inertia::render('Admin/About/Index-About', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'type' => 'required|in:image,video',
            'file' => 'nullable|file|max:20480', // 20MB max
        ]);

        $setting = AboutSetting::firstOrCreate(['key' => 'about_hero_bg'], [
            'type' => 'image',
            'value' => '/storage/logo/about-hero-bg.png',
            'is_active' => true
        ]);

        if ($request->hasFile('file')) {
            // Delete old file if it exists and is not the default
            if ($setting->value && !str_contains($setting->value, 'about-hero-bg.png')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $setting->value));
            }

            $path = $request->file('file')->store('about', 'public');
            $setting->value = Storage::url($path);
        }

        $setting->type = $request->type;
        $setting->save();

        return back()->with('success', 'Background About berhasil diperbarui.');
    }

    public function destroy()
    {
        $setting = AboutSetting::where('key', 'about_hero_bg')->first();

        if ($setting) {
            // Delete file from storage if not the default
            if ($setting->value && !str_contains($setting->value, 'about-hero-bg.png')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $setting->value));
            }

            $setting->delete();
        }

        return back()->with('success', 'Background About berhasil dihapus (dikembalikan ke default).');
    }
}
