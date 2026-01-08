<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogType;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Blog/Index-Blog', [
            'blogs' => Blog::with('blogType')->latest()->get(),
            'blogTypes' => BlogType::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Blog/Create-Blog', [
            'blogTypes' => BlogType::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'blog_type_id' => 'required|exists:blog_types,id',
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'image' => 'nullable|image|max:2048',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('blogs', 'public');
            $imagePath = Storage::url($imagePath);
        }

        Blog::create([
            'blog_type_id' => $request->blog_type_id,
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . Str::random(5),
            'date' => $request->date,
            'image' => $imagePath,
            'content' => $request->content,
            'excerpt' => $request->excerpt ?? Str::limit(strip_tags($request->content), 150),
            'is_published' => $request->is_published ?? true,
        ]);

        return redirect()->route('admin.blog.index')->with('success', 'Blog berhasil ditambahkan');
    }

    public function edit(Blog $blog)
    {
        return Inertia::render('Admin/Blog/Edit-Blog', [
            'blog' => $blog,
            'blogTypes' => BlogType::all()
        ]);
    }

    public function update(Request $request, Blog $blog)
    {
        $request->validate([
            'blog_type_id' => 'required|exists:blog_types,id',
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'image' => 'nullable|image|max:2048',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
        ]);

        $imagePath = $blog->image;
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($blog->image) {
                $oldPath = str_replace('/storage/', '', $blog->image);
                Storage::disk('public')->delete($oldPath);
            }
            $imagePath = $request->file('image')->store('blogs', 'public');
            $imagePath = Storage::url($imagePath);
        }

        $blog->update([
            'blog_type_id' => $request->blog_type_id,
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . Str::random(5),
            'date' => $request->date,
            'image' => $imagePath,
            'content' => $request->content,
            'excerpt' => $request->excerpt ?? Str::limit(strip_tags($request->content), 150),
            'is_published' => $request->is_published ?? true,
        ]);

        return redirect()->route('admin.blog.index')->with('success', 'Blog berhasil diperbarui');
    }

    public function destroy(Blog $blog)
    {
        if ($blog->image) {
            $oldPath = str_replace('/storage/', '', $blog->image);
            Storage::disk('public')->delete($oldPath);
        }

        $blog->delete();
        return redirect()->back()->with('success', 'Blog berhasil dihapus');
    }
}
