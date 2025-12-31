<?php

use App\Http\Controllers\Admin\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/admin/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/admin/login', [AuthController::class, 'login']);
Route::post('/admin/logout', [AuthController::class, 'logout'])->name('logout');

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

    return Inertia::render('Blog');
});

Route::get('/akademisi', function () {
    return Inertia::render('Akademisi');
});
