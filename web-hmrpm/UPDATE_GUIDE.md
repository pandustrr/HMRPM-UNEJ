# Panduan Update & Pengembangan Website HMRPM UNEJ

Dokumentasi ini menjelaskan cara menambah fitur atau mengubah website yang sudah di-hosting.

---

## 📋 Workflow Update Website

### 1. Development di Lokal (Laptop)

#### A. Jalankan Development Server

```bash
# Terminal 1: Jalankan Vite (Frontend)
npm run dev

# Terminal 2: Jalankan Laravel (Backend)
php artisan serve
```

Akses website lokal di: `http://localhost:8000`

#### B. Buat Perubahan

Edit file sesuai kebutuhan:

-   **Backend (PHP)**: `app/Http/Controllers/`, `routes/`, `database/`
-   **Frontend (React)**: `resources/js/Pages/`, `resources/js/Components/`
-   **Styling**: `resources/css/`, atau langsung di component (Tailwind)

#### C. Test Perubahan

Pastikan semua fitur berfungsi dengan baik di lokal sebelum upload ke hosting.

---

### 2. Build untuk Production

#### Jika Ada Perubahan Frontend (React/CSS/JS)

```bash
npm run build
```

**Penting**: Perintah ini akan membuat/update folder `public/build` yang berisi aset frontend yang sudah di-compile.

#### Jika Hanya Perubahan Backend (PHP)

Tidak perlu build, langsung lanjut ke langkah 3.

---

### 3. Commit & Push ke GitHub

```bash
# Tambahkan semua perubahan
git add .

# Commit dengan pesan yang jelas
git commit -m "Deskripsi perubahan (contoh: Tambah fitur galeri foto)"

# Push ke GitHub
git push origin main
```

---

### 4. Upload ke Hosting

Karena hosting tidak punya Terminal, ada 2 cara:

#### **Cara A: Via Git Pull (Jika Tersedia)**

1. Login ke **cPanel**
2. Buka menu **Git™ Version Control**
3. Cari repository `HMRPM-UNEJ`
4. Klik **Pull or Deploy** → **Update from Remote**
5. Tunggu sampai selesai

#### **Cara B: Upload Manual (Paling Aman)**

1. **Zip** folder yang berubah:

    - Jika perubahan kecil: Zip hanya folder yang berubah (misal: `app`, `resources`)
    - Jika perubahan besar: Zip seluruh project (kecuali `node_modules`)

2. **Upload** via cPanel File Manager:

    - Masuk ke `/home/hmrpmune/repositories/hmrpm/web-hmrpm/`
    - Upload file zip
    - Extract (overwrite file lama)

3. **File Penting yang Harus Di-Upload**:
    - `app/` - Jika ada perubahan controller/model
    - `resources/` - Jika ada perubahan view/component
    - `public/build/` - **WAJIB** jika ada perubahan frontend
    - `routes/` - Jika ada perubahan routing
    - `database/migrations/` - Jika ada perubahan struktur database
    - `config/` - Jika ada perubahan konfigurasi

---

### 5. Clear Cache (WAJIB!)

Setiap kali update kode, **WAJIB** hapus cache Laravel:

#### Cara Otomatis (Recommended)

Akses di browser:

```
https://hmrpmunej.id/fix.php
```

#### Cara Manual

1. Buka **File Manager** cPanel
2. Masuk ke `/home/hmrpmune/repositories/hmrpm/web-hmrpm/bootstrap/cache/`
3. Hapus semua file `.php` di folder tersebut (kecuali `.gitignore`)

---

### 6. Test di Website Live

Buka `https://hmrpmunej.id` dan test semua fitur yang diubah.

**Tips**: Gunakan mode Incognito/Private untuk menghindari cache browser.

---

## 🗄️ Update Database

### Jika Ada Perubahan Struktur Database

#### Cara 1: Via Migration (Recommended untuk Perubahan Kecil)

1. Buat migration di lokal:
    ```bash
    php artisan make:migration nama_migration
    ```
2. Edit file migration di `database/migrations/`
3. Test di lokal:
    ```bash
    php artisan migrate
    ```
4. Export **hanya migration baru** ke SQL
5. Import SQL tersebut di phpMyAdmin hosting

#### Cara 2: Export/Import Full Database (Untuk Perubahan Besar)

1. **Export** database lokal:

    - Buka phpMyAdmin lokal (`http://localhost/phpmyadmin`)
    - Pilih database `hmrpm-unej`
    - Klik **Export** → **Go**
    - Download file `.sql`

2. **Import** ke hosting:
    - Buka phpMyAdmin di cPanel
    - Pilih database `hmrpmune_db`
    - Klik **Import**
    - Upload file `.sql`
    - Klik **Go**

> ⚠️ **Peringatan**: Import full database akan **menimpa semua data** di hosting. Pastikan backup dulu jika ada data penting yang sudah di-input via website live.

---

## 🖼️ Upload Gambar/Asset Baru

### Gambar Statis (Logo, Icon, dll)

Upload ke folder `public/` di lokal, lalu:

1. Build: `npm run build`
2. Upload folder `public/` ke hosting

### Gambar Dinamis (Upload via Admin)

Otomatis tersimpan di `/home/hmrpmune/public_html/storage/` (sudah dikonfigurasi).

---

## 📝 Checklist Update (Copy Paste Setiap Update)

```markdown
-   [ ] 1. Edit kode di lokal
-   [ ] 2. Test di lokal (npm run dev + php artisan serve)
-   [ ] 3. Build assets (npm run build) - jika ada perubahan frontend
-   [ ] 4. Commit & Push ke GitHub
-   [ ] 5. Upload/Pull ke hosting
-   [ ] 6. Update database (jika ada perubahan struktur)
-   [ ] 7. Clear cache (https://hmrpmunej.id/fix.php)
-   [ ] 8. Test di https://hmrpmunej.id
```

---

## 🚨 Troubleshooting

### Error 500 Setelah Update

**Penyebab**: Cache config belum dihapus atau ada syntax error.

**Solusi**:

1. Akses `https://hmrpmunej.id/fix.php`
2. Jika masih error, ubah `.env` di hosting: `APP_DEBUG=true`
3. Refresh website, lihat pesan error detail
4. Perbaiki error, lalu ubah kembali `APP_DEBUG=false`

### Gambar Tidak Muncul Setelah Upload

**Penyebab**: File tidak ter-upload ke `public_html/storage`.

**Solusi**:

1. Cek apakah file ada di `/home/hmrpmune/public_html/storage/`
2. Jika tidak ada, cek konfigurasi `.env`:
    ```env
    PUBLIC_HTML_PATH=/home/hmrpmune/public_html/storage
    ```
3. Clear cache: `https://hmrpmunej.id/fix.php`

### Perubahan CSS/JS Tidak Muncul

**Penyebab**: Lupa build atau browser cache.

**Solusi**:

1. Pastikan sudah `npm run build` di lokal
2. Upload folder `public/build/` ke hosting
3. Buka website dengan mode Incognito
4. Hard refresh: `Ctrl + Shift + R` (Windows) atau `Cmd + Shift + R` (Mac)

---

## 💡 Tips Best Practice

1. **Jangan Edit Langsung di Hosting**

    - Selalu edit di lokal dulu
    - Test sampai yakin tidak ada bug
    - Baru upload ke hosting

2. **Backup Berkala**

    - Download folder `storage` dari hosting setiap minggu
    - Export database setiap sebelum update besar

3. **Gunakan Git dengan Baik**

    - Commit message yang jelas: "Tambah fitur X" bukan "update"
    - Commit sering (setiap fitur kecil selesai)
    - Jangan commit file `.env` (sudah di-ignore)

4. **Test di Berbagai Device**

    - Desktop
    - Mobile (Chrome DevTools → Toggle Device Toolbar)
    - Browser berbeda (Chrome, Firefox, Safari)

5. **Monitor Google Search Console**
    - Cek error crawling setiap minggu
    - Update sitemap jika ada halaman baru

---

## 📞 Kontak Darurat

Jika ada masalah kritis yang tidak bisa diselesaikan:

1. Restore backup terakhir
2. Hubungi support hosting Arenhost
3. Atau konsultasi dengan developer

---

**Dibuat**: 9 Januari 2026  
**Terakhir Update**: 9 Januari 2026  
**Versi**: 1.0
