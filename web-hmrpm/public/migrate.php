<?php
// Script untuk menjalankan migration di Hosting cPanel (Tanpa Terminal)
// Upload file ini ke public_html/ lalu akses di browser: hmrpmunej.id/migrate.php

require __DIR__ . '/../repositories/hmrpm/web-hmrpm/vendor/autoload.php';
$app = require_once __DIR__ . '/../repositories/hmrpm/web-hmrpm/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Artisan;

echo "<h1>🛠️ Database Migration Tool</h1>";
echo "<p>Script ini akan menjalankan perintah 'php artisan migrate' di server.</p>";
echo "<hr>";

try {
    // Jalankan Migrate
    echo "<h3>Running: php artisan migrate --force</h3>";
    Artisan::call('migrate', ['--force' => true]);

    // Tampilkan Output
    $output = Artisan::output();
    if (empty($output)) {
        echo "<pre style='background:#f0f0f0;padding:10px;'>Tidak ada migration baru yang perlu dijalankan (Nothing to migrate).</pre>";
    } else {
        echo "<pre style='background:#e8f5e9;padding:10px;color:green;'>" . htmlspecialchars($output) . "</pre>";
    }

    echo "<h2 style='color:green'>✅ Migration Selesai!</h2>";
} catch (\Exception $e) {
    echo "<h2 style='color:red'>❌ Error:</h2>";
    echo "<pre style='background:#ffebee;padding:10px;'>" . htmlspecialchars($e->getMessage()) . "</pre>";
}

echo "<hr>";
echo "<p>Use with caution. Hapus file ini setelah selesai dipakai.</p>";
