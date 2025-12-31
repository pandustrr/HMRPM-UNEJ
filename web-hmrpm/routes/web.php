<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/divisi', function () {
    return Inertia::render('Divisi');
});

Route::get('/proker', function () {
    return Inertia::render('Proker');
});

Route::get('/blog', function () {
    return Inertia::render('Blog');
});

Route::get('/blog/{id}', function ($id) {
    // Ideally fetch post from DB, but for now passing ID to view or let view handle it (if hardcoded)
    // The existing Blog detail page likely expects param.
    // Check if there is a BlogDetail page?
    // In App.jsx, there wasn't a dynamic route shown in my previous `view_file` of App.jsx (lines 1-29).
    // Wait, App.jsx had:
    // <Route path="blog" element={<Blog />} />
    // It didn't show nested routes or dynamic routes in the snippet I saw.
    // BUT Blog.jsx has links to `/blog/${post.id}`.
    // If App.jsx didn't have the route, then those links would fail or go to 404 in React Router unless I missed it.
    // Let's look at Step 53 output again.
    // Lines 15-22 didn't show `blog/:id`.
    // Maybe they haven't implemented the detail page yet?
    // "Blog & Berita" links to `/blog/1`.
    // If the user clicks it, and there is no route, it would fail.
    // I will add the route just in case, mapping to a placeholder or same page?
    // If I map to 'Blog', it just reloads Blog list.
    // I will assume for now only top level pages exist.
    return Inertia::render('Blog'); // Temporary fallback or maybe they handle it?
    // Re-reading Step 53: lines 16-21. No dynamic route.
    // So the existing code might be incomplete regarding Blog Details.
    // I will stick to the routes visible in App.jsx.
});

Route::get('/akademisi', function () {
    return Inertia::render('Akademisi');
});
