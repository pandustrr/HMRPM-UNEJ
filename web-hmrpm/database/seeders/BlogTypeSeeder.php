<?php

namespace Database\Seeders;

use App\Models\BlogType;
use Illuminate\Database\Seeder;

class BlogTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $blogTypes = [
            ['name' => 'Berita', 'slug' => 'berita'],
            ['name' => 'Artikel', 'slug' => 'artikel'],
            ['name' => 'Pengumuman', 'slug' => 'pengumuman'],
            ['name' => 'Dokumentasi', 'slug' => 'dokumentasi'],
        ];

        foreach ($blogTypes as $blogType) {
            BlogType::create($blogType);
        }
    }
}
