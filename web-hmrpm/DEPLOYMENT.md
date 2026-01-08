# Panduan Deployment HMRPM UNEJ ke Arenhost (cPanel)

Panduan ini dibuat khusus untuk struktur project Anda (Laravel 11 + React Inertia) agar bisa berjalan di shared hosting cPanel.

## 1. Persiapan di Komputer Lokal (Wajib)

Karena di hosting cPanel (Shared) kita seringkali tidak bisa menjalankan `npm install` atau `npm run build`, kita harus melakukannya di lokal.

1.  **Matikan server lokal sementara** (Ctrl+C di terminal yang menjalankan `npm run dev`).
2.  **Build Aset Frontend**:
    Jalankan perintah ini di terminal VS Code:
    ```bash
    npm run build
    ```
    _Tunggu sampai selesai. Ini akan membuat folder `public/build`._
3.  **Upload ke GitHub**:
    Saya sudah mengatur agar folder hasil build ini bisa di-upload.
    ```bash
    git add .
    git commit -m "Persiapan deploy: build production assets"
    git push origin main
    ```

---

## 2. Persiapan di cPanel (Arenhost)

### Langkah A: Setup Database

1.  Login ke cPanel.
2.  Buka menu **MySQL ® Database Wizard**.
3.  **Step 1**: Buat Database (contoh: `hmrpmune_db`).
4.  **Step 2**: Buat User Database (contoh: `hmrpmune_user`) dan password yang kuat. **Catat password ini!**
5.  **Step 3**: Centang **ALL PRIVILEGES** lalu klik Next/Make Changes.

### Langkah B: Upload File Project

Ada 2 cara, pilih salah satu:

**Cara 1: Via Git Version Control (Direkomendasikan)**

1.  Di cPanel, buka menu **Git™ Version Control**.
2.  Klik **Create**.
3.  **Clone URL**: `https://github.com/pandustrr/HMRPM-UNEJ.git`
4.  **Repository Path**: Masukkan path folder baru, misal: `repositories/hmrpm` (Jangan arahkan langsung ke `public_html` agar lebih aman).
5.  Klik **Create**.

**Cara 2: Upload Manual (File Manager)**

1.  Zip folder project Anda di komputer (kecuali `node_modules`).
2.  Di cPanel **File Manager**, upload zip ke folder pilihan (misal `repositories/hmrpm`).
3.  Extract file tersebut.

### Langkah C: Install Dependencies (PHP)

1.  Di cPanel, cari menu **Terminal** (jika ada).
2.  Masuk ke folder project: `cd repositories/hmrpm/web-hmrpm` (sesuaikan struktur folder repo Anda).
3.  Jalankan:
    ```bash
    composer install --optimize-autoloader --no-dev
    cp .env.example .env
    php artisan key:generate
    ```

---

## 3. Konfigurasi Akhir

### Setting .env

1.  Buka **File Manager**, masuk ke folder project Anda.
2.  Edit file `.env` (klik kanan -> Edit).
3.  Sesuaikan isinya:

    ```env
    APP_NAME="HMRPM UNEJ"
    APP_ENV=production
    APP_DEBUG=false
    APP_URL=https://hmrpmunej.id

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=hmrpmune_db (sesuaikan nama dari Langkah A)
    DB_USERNAME=hmrpmune_user (sesuaikan nama user dari Langkah A)
    DB_PASSWORD=password_anda
    ```

4.  Simpan.

### Menghubungkan Domain ke Folder Public

Agar website bisa diakses, kita perlu mengarahkan domain ke folder `public` di dalam project Laravel.

**Metode Symlink (Paling Rapi)**:
Jika Anda menaruh project di `repositories/hmrpm/web-hmrpm`, tapi domain Anda mengarah ke `public_html`:

1.  Hapus folder `public_html` (atau isinya) jika kosong.
2.  Buka **Terminal** cPanel.
3.  Jalankan perintah symlink:
    ```bash
    ln -s /home/hmrpmune/repositories/hmrpm/web-hmrpm/public /home/hmrpmune/public_html
    ```
    _(Ganti `/home/hmrpmune` dengan path home direktori hosting Anda yang sebenarnya. Bisa dilihat di File Manager sebelah kiri)._

**Metode Alternatif (Copy Index - Tidak Disarankan tapi Mudah)**:
Jika tidak bisa symlink, Anda bisa memindahkan **ISI** folder `public` ke `public_html`, lalu edit `index.php` untuk memperbaiki path `require` ke `vendor/autoload.php` dll.

### Langkah Terakhir: Migrasi Database & Storage

Di Terminal cPanel:

```bash
php artisan migrate --force
php artisan storage:link
```

## Troubleshooting

-   **Error 500 / Blank**: Cek permission folder `storage`. Klik kanan folder `storage` -> Change Permissions -> set ke **775**.
-   **Vite Manifest not found**: Pastikan langkah **1. Persiapan Lokal** sudah dilakukan dan folder `public/build` ada di server.
