<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AkademisiSetting;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AkademisiSettingController extends Controller
{
    public function index()
    {
        $settings = AkademisiSetting::where('key', 'akademisi_hero_bg')->first();
        return Inertia::render('Admin/Akademisi/Index-Akademisi', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'type' => 'required|in:image,video',
            'file' => 'nullable|file|max:20480', // 20MB max
        ]);

        $setting = AkademisiSetting::firstOrCreate(['key' => 'akademisi_hero_bg'], [
            'type' => 'image',
            'value' => '/storage/logo/about-hero-bg.png',
            'is_active' => true
        ]);

        if ($request->hasFile('file')) {
            // Delete old file if it exists and is not the default
            if ($setting->value && !str_contains($setting->value, 'about-hero-bg.png')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $setting->value));
            }

            $path = $request->file('file')->store('akademisi', 'public');
            $setting->value = Storage::url($path);
        }

        $setting->type = $request->type;
        $setting->save();

        return back()->with('success', 'Background Akademisi berhasil diperbarui.');
    }

    public function destroy()
    {
        $setting = AkademisiSetting::where('key', 'akademisi_hero_bg')->first();

        if ($setting) {
            // Delete file from storage if not the default
            if ($setting->value && !str_contains($setting->value, 'about-hero-bg.png')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $setting->value));
            }

            $setting->delete();
        }

        return back()->with('success', 'Background Akademisi berhasil dihapus (dikembalikan ke default).');
    }
}
