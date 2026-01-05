<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AboutSettingController;
use App\Http\Controllers\Admin\PeriodController;
use App\Http\Controllers\Admin\DivisionController as AdminDivisionController;
use App\Http\Controllers\Admin\DivisionMemberController;
use App\Http\Controllers\Admin\AdvisorController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\BlogTypeController;
use App\Http\Controllers\Admin\BlogSettingController;
use App\Http\Controllers\Admin\AkademisiSettingController;
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

    Route::get('/akademisi-setting', [AkademisiSettingController::class, 'index'])->name('akademisi-setting.index');
    Route::post('/akademisi-setting', [AkademisiSettingController::class, 'update'])->name('akademisi-setting.update');
    Route::delete('/akademisi-setting', [AkademisiSettingController::class, 'destroy'])->name('akademisi-setting.destroy');

    // Proker Background Settings
    Route::get('/proker', [App\Http\Controllers\Admin\ProkerSettingController::class, 'index'])->name('proker.index');
    Route::post('/proker', [App\Http\Controllers\Admin\ProkerSettingController::class, 'update'])->name('proker.update');
    Route::delete('/proker', [App\Http\Controllers\Admin\ProkerSettingController::class, 'destroy'])->name('proker.destroy');

    // Program Kerja
    Route::resource('program-kerja', App\Http\Controllers\Admin\ProgramKerjaController::class);

    // Periods
    Route::resource('periods', PeriodController::class);
    Route::post('periods/{period}/toggle-active', [PeriodController::class, 'toggleActive'])->name('periods.toggleActive');

    // Divisions & Members Dashboard
    Route::get('divisions-dashboard', [AdminDivisionController::class, 'dashboard'])->name('divisions.dashboard');

    // Divisions & Members
    Route::resource('divisions', AdminDivisionController::class);
    Route::resource('members', DivisionMemberController::class);

    // Advisors (Pembina & Pendamping)
    Route::patch('advisors/{advisor}/toggle-active', [AdvisorController::class, 'toggleActive'])->name('advisors.toggleActive');
    Route::resource('advisors', AdvisorController::class);

    // Blog
    Route::get('/blog-setting', [BlogSettingController::class, 'index'])->name('blog-setting.index');
    Route::post('/blog-setting', [BlogSettingController::class, 'update'])->name('blog-setting.update');
    Route::delete('/blog-setting', [BlogSettingController::class, 'destroy'])->name('blog-setting.destroy');
    Route::resource('blog-types', BlogTypeController::class);
    Route::resource('blog', BlogController::class);
});

Route::get('/', function () {
    $background = \App\Models\AboutSetting::where('key', 'about_hero_bg')->first();
    return Inertia::render('Home', [
        'background' => $background
    ]);
});

Route::get('/about', [AboutController::class, 'index']);
Route::get('/divisi', [DivisionController::class, 'index'])->name('divisi.index'); // Updated to Controller

Route::get('/proker', function () {
    $background = \App\Models\ProkerSetting::where('key', 'proker_hero_bg')->first();
    $divisions = \App\Models\Division::with(['programKerjas' => function ($query) {
        $query->orderBy('event_date', 'desc');
    }])->get();

    return Inertia::render('Proker', [
        'background' => $background,
        'divisions' => $divisions
    ]);
});

Route::get('/proker/{division}', function ($divisionId) {
    $background = \App\Models\ProkerSetting::where('key', 'proker_hero_bg')->first();
    $divisions = \App\Models\Division::with(['programKerjas' => function ($query) {
        $query->orderBy('event_date', 'desc');
    }])->get();

    return Inertia::render('DetailProker', [
        'background' => $background,
        'divisions' => $divisions,
        'divisionId' => $divisionId
    ]);
});

Route::get('/blog', function () {
    $background = \App\Models\BlogSetting::where('key', 'blog_hero_bg')->first();
    return Inertia::render('Blog', [
        'background' => $background,
        'blogs' => \App\Models\Blog::with('blogType')->where('is_published', true)->latest()->get()
    ]);
});

Route::get('/blog/{blog:slug}', function (\App\Models\Blog $blog) {
    return Inertia::render('DetailBlog', [
        'blog' => $blog->load('blogType'),
        'relatedBlogs' => \App\Models\Blog::where('blog_type_id', $blog->blog_type_id)
            ->where('id', '!=', $blog->id)
            ->where('is_published', true)
            ->limit(3)
            ->get()
    ]);
});

Route::get('/akademisi', function () {
    $background = \App\Models\AkademisiSetting::where('key', 'akademisi_hero_bg')->first();
    return Inertia::render('Akademisi', [
        'background' => $background
    ]);
});
