<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BlogSetting;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BlogSettingController extends Controller
{
    public function index()
    {
        $settings = BlogSetting::where('key', 'blog_hero_bg')->first();
        return Inertia::render('Admin/Blog/Index-BlogSetting', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'type' => 'required|in:image,video',
            'file' => 'nullable|file|max:20480', // 20MB max
        ]);

        $setting = BlogSetting::firstOrCreate(['key' => 'blog_hero_bg'], [
            'type' => 'image',
            'value' => '/storage/logo/about-hero-bg.png',
            'is_active' => true
        ]);

        if ($request->hasFile('file')) {
            // Delete old file if it exists and is not the default
            if ($setting->value && !str_contains($setting->value, 'about-hero-bg.png')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $setting->value));
            }

            $path = $request->file('file')->store('blog', 'public');
            $setting->value = Storage::url($path);
        }

        $setting->type = $request->type;
        $setting->save();

        return back()->with('success', 'Background Blog berhasil diperbarui.');
    }

    public function destroy()
    {
        $setting = BlogSetting::where('key', 'blog_hero_bg')->first();

        if ($setting) {
            // Delete file from storage if not the default
            if ($setting->value && !str_contains($setting->value, 'about-hero-bg.png')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $setting->value));
            }

            $setting->delete();
        }

        return back()->with('success', 'Background Blog berhasil dihapus (dikembalikan ke default).');
    }
}
