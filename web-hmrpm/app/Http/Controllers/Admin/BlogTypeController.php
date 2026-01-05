<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogType;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogTypeController extends Controller
{
    public function index()
    {
        return redirect()->route('admin.blog.index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        BlogType::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name) . '-' . Str::random(5),
        ]);

        return redirect()->back()->with('success', 'Tipe Blog berhasil ditambahkan');
    }

    public function update(Request $request, BlogType $blogType)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $blogType->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name) . '-' . Str::random(5),
        ]);

        return redirect()->back()->with('success', 'Tipe Blog berhasil diperbarui');
    }

    public function destroy(BlogType $blogType)
    {
        $blogType->delete();
        return redirect()->back()->with('success', 'Tipe Blog berhasil dihapus');
    }
}
