# Panduan Deployment Manual HMRPM UNEJ (Tanpa Terminal)

Panduan ini disesuaikan untuk hosting **Arenhost cPanel** dengan struktur folder: `/home/hmrpmune/repositories/hmrpm/web-hmrpm`.

## 1. Persiapan di Laptop (Wajib)

Lakukan ini di komputer Anda sebelum upload.

1.  **Build Frontend**:
    ```bash
    npm run build
    ```
2.  **Install Dependencies**:
    ```bash
    composer install --optimize-autoloader --no-dev
    ```
    _Ini akan membuat folder `vendor` yang **WAJIB** ada._
3.  **Export Database**:
    Export database lokal Anda menjadi file `.sql`.


## 2. Upload ke cPanel

### A. Upload File

1.  Zip seluruh folder project Anda (termasuk folder `vendor` dan `public/build`).
    -   **PENTING**: Folder `node_modules` **JANGAN** di-upload.
2.  Upload ke **File Manager** cPanel di: `/home/hmrpmune/repositories/hmrpm/`.
3.  Extract file tersebut.
4.  **CHECKLIST**: Pastikan struktur file Anda seperti ini:
    -   `/home/hmrpmune/repositories/hmrpm/web-hmrpm/app`
    -   `/home/hmrpmune/repositories/hmrpm/web-hmrpm/public`
    -   `/home/hmrpmune/repositories/hmrpm/web-hmrpm/vendor` (**WAJIB ADA**)
    -   `/home/hmrpmune/repositories/hmrpm/web-hmrpm/.env`

### B. Setup Database

1.  Buat Database & User di **MySQL Database Wizard**.
2.  Import file `.sql` Anda di **phpMyAdmin**.

### C. Konfigurasi .env

Edit file `/home/hmrpmune/repositories/hmrpm/web-hmrpm/.env`:

```env
APP_NAME="HMRPM UNEJ"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://hmrpmunej.id

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hmrpmune_nama_db_anda
DB_USERNAME=hmrpmune_user_db_anda
DB_PASSWORD=password_db_anda
```

---

## 3. Menghubungkan Domain & Storage

### A. Symlink Storage (Wajib agar gambar muncul)

1.  Masuk ke folder `public`: `/home/hmrpmune/repositories/hmrpm/web-hmrpm/public`.
2.  Buat file baru: `link.php`.
3.  Isi kode berikut:

    ```php
<?php
$target = '/home/hmrpmune/repositories/hmrpm/web-hmrpm/storage/app/public';
$shortcut = '/home/hmrpmune/repositories/hmrpm/web-hmrpm/public/storage';

if(file_exists($shortcut)){
    echo "Shortcut sudah ada. Hapus dulu folder 'storage' di dalam public jika ingin buat ulang.";
} else if(symlink($target, $shortcut)){
    echo "<h1>SUKSES!</h1> Storage Link berhasil dibuat.";
} else {
    echo "<h1>GAGAL</h1> Cek path folder.";
}
?>
    ```

4.  (Nanti jalankan ini setelah Langkah B).

### B. Menghubungkan ke Public HTML (Agar web bisa diakses)

Karena file project Anda ada di folder rahasia (`repositories`), kita harus "memancingnya" dari `public_html`.

1.  Masuk ke folder **`public_html`** (folder utama website).
2.  Hapus file `index.php` bawaan (jika ada).
3.  Buat file **`index.php`** baru di situ.
4.  Isi dengan kode ini:

    ```php
    <?php

    use Illuminate\Http\Request;

    define('LARAVEL_START', microtime(true));

    // Arahkan ke maintenance mode jika ada
    if (file_exists($maintenance = __DIR__.'/../repositories/hmrpm/web-hmrpm/storage/framework/maintenance.php')) {
        require $maintenance;
    }

    // Load Composer Autoload (Arahkan ke folder repositories)
    require __DIR__.'/../repositories/hmrpm/web-hmrpm/vendor/autoload.php';

    // Load App Bootstrap
    $app = require_once __DIR__.'/../repositories/hmrpm/web-hmrpm/bootstrap/app.php';

    $app->handleRequest(Request::capture());
    ```

5.  **Copy** juga file `.htaccess` dan `favicon.ico` dan folder `build` (dari `web-hmrpm/public`) ke dalam `public_html` agar aset terbaca.

    -   **Alternatif Lebih Mudah (Symlink Folder Public)**:
        Jika Anda bingung cara copy-copy diatas, cara paling bersih adalah membuat symlink folder public ke public_html (tapi butuh script PHP lain).
        Karena Anda pemula, saya sarankan:
        1.  Hapus `public_html` (folder kosong).
        2.  Buat script `symlink_public.php` di folder root (`/home/hmrpmune/`).
        3.  Isi: `<?php symlink('/home/hmrpmune/repositories/hmrpm/web-hmrpm/public', '/home/hmrpmune/public_html'); ?>`
        4.  Akses file itu (agak tricky karena belum ada domain yang connect).

    **Saran Terbaik (Copy Paste Isi Public)**:

    1.  Buka folder `/home/hmrpmune/repositories/hmrpm/web-hmrpm/public`.
    2.  **Select All** -> **Copy**.
    3.  Tujuan Copy: `/public_html`.
    4.  Lalu Edit `/public_html/index.php` sesuaikan path `require` seperti kode di langkah 4 di atas.

### C. Finalisasi

1.  Buka browser: `https://hmrpmunej.id/link.php`. Jika sukses ("SUKSES!"), selamat!
2.  Hapus file `link.php` demi keamanan.
