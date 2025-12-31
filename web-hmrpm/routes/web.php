<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AboutSettingController;
use App\Http\Controllers\AboutController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/admin/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/admin/login', [AuthController::class, 'login']);
Route::post('/admin/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/about', [AboutSettingController::class, 'index'])->name('admin.about');
    Route::post('/admin/about', [AboutSettingController::class, 'update'])->name('admin.about.update');
    Route::delete('/admin/about', [AboutSettingController::class, 'destroy'])->name('admin.about.destroy');
});

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/about', [AboutController::class, 'index']);

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
