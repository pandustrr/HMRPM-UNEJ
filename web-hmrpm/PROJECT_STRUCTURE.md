# Dokumentasi Struktur Project HMRPM

Dokumen ini berisi gambaran umum struktur file dan folder yang telah diimplementasikan, khususnya untuk fitur **Admin, Divisi, dan Pengurus**.

## 📂 Backend (Laravel)

### 🏗️ Models (`app/Models/`)

-   `Period.php`: Mengelola data periode kepengurusan.
-   `Division.php`: Mengelola data divisi organisasi (terhubung dengan `Period`).
-   `DivisionMember.php`: Mengelola data pengurus/anggota (terhubung dengan `Division`).
-   `AboutSetting.php`: Mengelola latar belakang hero halaman About.

### 🎮 Controllers (`app/Http/Controllers/Admin/`)

-   `DivisionController.php`: Menangani CRUD Divisi dan Dashboard Divisi.
-   `DivisionMemberController.php`: Menangani CRUD Pengurus (Anggota).
-   `PeriodController.php`: Menangani CRUD Periode kepengurusan.
-   `AboutSettingController.php`: Menangani pengaturan background halaman About.
-   `DashboardController.php`: Kontroler utama dashboard admin.

### 🗄️ Database (`database/`)

-   **Migrations**:
    -   `*_create_periods_table.php`
    -   `*_create_divisions_table.php`
    -   `*_create_division_members_table.php`
-   **Seeders**:
    -   `InitialDataSeeder.php`: Menyediakan data awal untuk periode dan divisi.

---

## 🎨 Frontend (React + Inertia)

### 📄 Pages (`resources/js/Pages/Admin/`)

#### 🏢 Divisi (`Divisions/`)

-   `Dashboard-Division.jsx`: Halaman kartu navigasi utama Divisi & Periode.
-   `Index-Division.jsx`: Daftar divisi berdasarkan periode.
-   `Create-Division.jsx`: Form pembuatan divisi baru.
-   `Edit-Division.jsx`: Form pembaruan info divisi & pengelolaan anggota pengurus.
-   `Detail-Division.jsx`: Modal popup detail informasi divisi.

#### 👥 Pengurus (`Members/`)

-   `Index-Member.jsx`: Daftar seluruh pengurus dengan filter periode & divisi.
-   `Create-Member.jsx`: Halaman form tambah pengurus baru.
-   `Edit-Member.jsx`: Halaman form ubah data pengurus.
-   `Detail-Member.jsx`: Modal profil lengkap pengurus.
-   `Modal-Member.jsx`: Komponen modal form tambah pengurus (digunakan di dalam `Edit-Division`).

#### 📅 Periode (`Periods/`)

-   `Index-Period.jsx`: Pengelolaan tahun periode kepengurusan.

#### ℹ️ About (`About/`)

-   `Index-About.jsx`: Pengaturan background hero (Video/Gambar/GIF).

### 🧩 Components (`resources/js/Components/Admin/`)

-   `Modal.jsx`: Komponen dasar (_base wrapper_) untuk semua popup/detail dengan gaya konsisten.
-   `ConfirmModal.jsx`: Komponen modal konfirmasi aksi (seperti hapus data).

---

## 🛠️ Konvensi Penamaan

Fitur Admin menggunakan pola penamaan file `{Action}-{Feature}.jsx` (contoh: `Index-Division.jsx`) untuk memudahkan pencarian file saat pengembangan dan menghindari kebingungan nama file yang serupa di folder yang berbeda.

---

## 🌳 Struktur Folder & File (Visual)

```text
|-- app
  |-- Http
    |-- Controllers
      |-- Admin
        |-- AboutSettingController.php
        |-- AuthController.php
        |-- DashboardController.php
        |-- DivisionController.php
        |-- DivisionMemberController.php
        |-- PeriodController.php
      |-- AboutController.php
      |-- Controller.php
      |-- DivisionController.php
    |-- Middleware
      |-- HandleInertiaRequests.php
  |-- Models
    |-- AboutSetting.php
    |-- Division.php
    |-- DivisionMember.php
    |-- Period.php
    |-- User.php
  |-- Providers
    |-- AppServiceProvider.php
|-- bootstrap
  |-- cache
    |-- packages.php
    |-- services.php
  |-- app.php
  |-- providers.php
|-- config
  |-- app.php
  |-- auth.php
  |-- cache.php
  |-- database.php
  |-- filesystems.php
  |-- logging.php
  |-- mail.php
  |-- queue.php
  |-- services.php
  |-- session.php
|-- database
  |-- factories
    |-- UserFactory.php
  |-- migrations
    |-- 0001_01_01_000000_create_users_table.php
    |-- 0001_01_01_000001_create_cache_table.php
    |-- 0001_01_01_000002_create_jobs_table.php
    |-- 2025_12_31_185353_add_username_to_users_table.php
    |-- 2025_12_31_195915_create_about_settings_table.php
    |-- 2025_12_31_212628_create_periods_table.php
    |-- 2025_12_31_212637_create_divisions_table.php
    |-- 2025_12_31_212640_create_division_members_table.php
  |-- seeders
    |-- AdminUserSeeder.php
    |-- DatabaseSeeder.php
    |-- InitialDataSeeder.php
  |-- database.sqlite
|-- public
  |-- .htaccess
  |-- favicon.ico
  |-- index.php
  |-- logo.png
  |-- robots.txt
|-- resources
  |-- css
    |-- app.css
  |-- js
    |-- Components
      |-- Admin
        |-- Modal.jsx
      |-- AdminSidebar.jsx
      |-- AdminTopbar.jsx
      |-- ConfirmModal.jsx
      |-- Footer.jsx
      |-- InteractiveLogo.jsx
      |-- Navbar.jsx
      |-- ThemeToggle.jsx
      |-- Toast.jsx
    |-- Layouts
      |-- AdminLayout.jsx
      |-- MainLayout.jsx
    |-- lib
      |-- utils.js
    |-- Pages
      |-- Admin
        |-- About
          |-- Index-About.jsx
        |-- Divisions
          |-- Create-Division.jsx
          |-- Dashboard-Division.jsx
          |-- Detail-Division.jsx
          |-- Edit-Division.jsx
          |-- Index-Division.jsx
        |-- Members
          |-- Create-Member.jsx
          |-- Detail-Member.jsx
          |-- Edit-Member.jsx
          |-- Index-Member.jsx
          |-- Modal-Member.jsx
        |-- Periods
          |-- Index-Period.jsx
        |-- Dashboard.jsx
        |-- Login.jsx
      |-- About.jsx
      |-- Akademisi.jsx
      |-- Blog.jsx
      |-- Divisi.jsx
      |-- Home.jsx
      |-- Proker.jsx
    |-- app.jsx
    |-- bootstrap.js
  |-- views
    |-- app.blade.php
|-- routes
  |-- console.php
  |-- web.php
|-- .env
|-- artisan
|-- composer.json
|-- package.json
|-- PROJECT_STRUCTURE.md
|-- vite.config.js
```
