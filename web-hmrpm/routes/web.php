<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AboutSettingController;
use App\Http\Controllers\Admin\PeriodController;
use App\Http\Controllers\Admin\DivisionController as AdminDivisionController;
use App\Http\Controllers\Admin\DivisionMemberController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\DivisionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/admin/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/admin/login', [AuthController::class, 'login']);
Route::post('/admin/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/about', [AboutSettingController::class, 'index'])->name('about');
    Route::post('/about', [AboutSettingController::class, 'update'])->name('about.update');
    Route::delete('/about', [AboutSettingController::class, 'destroy'])->name('about.destroy');

    // Periods
    Route::resource('periods', PeriodController::class);
    Route::post('periods/{period}/set-active', [PeriodController::class, 'setActive'])->name('periods.setActive');

    // Divisions & Members Dashboard
    Route::get('divisions-dashboard', [AdminDivisionController::class, 'dashboard'])->name('divisions.dashboard');

    // Divisions & Members
    Route::resource('divisions', AdminDivisionController::class);
    Route::resource('members', DivisionMemberController::class);
});

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/about', [AboutController::class, 'index']);
Route::get('/divisi', [DivisionController::class, 'index'])->name('divisi.index'); // Updated to Controller

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
