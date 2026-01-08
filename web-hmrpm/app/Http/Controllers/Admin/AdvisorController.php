<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Advisor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AdvisorController extends Controller
{
    public function index()
    {
        $advisors = Advisor::orderBy('type')->orderBy('name')->get();
        return Inertia::render('Admin/About/Advisor/Index-Advisor', [
            'advisors' => $advisors
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/About/Advisor/Create-Advisor');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:pembina,pendamping',
            'name' => 'required|string|max:255',
            'nidn' => 'nullable|string|max:255',
            'nip_nik' => 'nullable|string|max:255',
            'birth_place' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|in:Laki-laki,Perempuan',
            'religion' => 'nullable|string|max:255',
            'rank' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'university' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'phone_office' => 'nullable|string|max:255',
            'address_home' => 'nullable|string',
            'phone_home' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'image' => 'nullable|image|max:2048',
            'video' => 'nullable|mimes:mp4,mov,ogg,webm|max:10240',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('advisors/images', 'public');
            $validated['image'] = Storage::url($path);
        }

        if ($request->hasFile('video')) {
            $path = $request->file('video')->store('advisors/videos', 'public');
            $validated['video'] = Storage::url($path);
        }

        Advisor::create($validated);

        return redirect()->route('admin.advisors.index')->with('success', 'Data berhasil ditambahkan.');
    }

    public function edit(Advisor $advisor)
    {
        return Inertia::render('Admin/About/Advisor/Edit-Advisor', [
            'advisor' => $advisor
        ]);
    }

    public function update(Request $request, Advisor $advisor)
    {
        $validated = $request->validate([
            'type' => 'required|in:pembina,pendamping',
            'name' => 'required|string|max:255',
            'nidn' => 'nullable|string|max:255',
            'nip_nik' => 'nullable|string|max:255',
            'birth_place' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|in:Laki-laki,Perempuan',
            'religion' => 'nullable|string|max:255',
            'rank' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'university' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'phone_office' => 'nullable|string|max:255',
            'address_home' => 'nullable|string',
            'phone_home' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'image' => 'nullable|image|max:2048',
            'video' => 'nullable|mimes:mp4,mov,ogg,webm|max:10240',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('image')) {
            if ($advisor->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $advisor->image));
            }
            $path = $request->file('image')->store('advisors/images', 'public');
            $validated['image'] = Storage::url($path);
        }

        if ($request->hasFile('video')) {
            if ($advisor->video) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $advisor->video));
            }
            $path = $request->file('video')->store('advisors/videos', 'public');
            $validated['video'] = Storage::url($path);
        }

        $advisor->update($validated);

        return redirect()->route('admin.advisors.index')->with('success', 'Data berhasil diperbarui.');
    }

    public function toggleActive(Advisor $advisor)
    {
        $advisor->update([
            'is_active' => !$advisor->is_active
        ]);

        return back()->with('success', 'Status pembina berhasil diperbarui.');
    }

    public function destroy(Advisor $advisor)
    {
        if ($advisor->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $advisor->image));
        }
        if ($advisor->video) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $advisor->video));
        }
        $advisor->delete();
        return redirect()->route('admin.advisors.index')->with('success', 'Data berhasil dihapus.');
    }
}
