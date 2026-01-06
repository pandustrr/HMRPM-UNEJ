<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Academic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AcademicController extends Controller
{
    public function index()
    {
        $academics = Academic::orderBy('type')->orderBy('name')->get();
        return Inertia::render('Admin/Akademisi/Index-Academic', [
            'academics' => $academics
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Akademisi/Create-Academic');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:dosen,teknisi',
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
            $path = $request->file('image')->store('academics/images', 'public');
            $validated['image'] = Storage::url($path);
        }

        if ($request->hasFile('video')) {
            $path = $request->file('video')->store('academics/videos', 'public');
            $validated['video'] = Storage::url($path);
        }

        Academic::create($validated);

        return redirect()->route('admin.academics.index')->with('success', 'Data berhasil ditambahkan.');
    }

    public function edit(Academic $academic)
    {
        return Inertia::render('Admin/Akademisi/Edit-Academic', [
            'academic' => $academic
        ]);
    }

    public function update(Request $request, Academic $academic)
    {
        $validated = $request->validate([
            'type' => 'required|in:dosen,teknisi',
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
            if ($academic->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $academic->image));
            }
            $path = $request->file('image')->store('academics/images', 'public');
            $validated['image'] = Storage::url($path);
        }

        if ($request->hasFile('video')) {
            if ($academic->video) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $academic->video));
            }
            $path = $request->file('video')->store('academics/videos', 'public');
            $validated['video'] = Storage::url($path);
        }

        $academic->update($validated);

        return redirect()->route('admin.academics.index')->with('success', 'Data berhasil diperbarui.');
    }

    public function toggleActive(Academic $academic)
    {
        $academic->update([
            'is_active' => !$academic->is_active
        ]);

        return back()->with('success', 'Status akademisi berhasil diperbarui.');
    }

    public function destroy(Academic $academic)
    {
        if ($academic->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $academic->image));
        }
        if ($academic->video) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $academic->video));
        }
        $academic->delete();
        return redirect()->route('admin.academics.index')->with('success', 'Data berhasil dihapus.');
    }
}
