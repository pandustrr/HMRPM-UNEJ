<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\BlogType;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $beritaType = BlogType::where('slug', 'berita')->first();
        $artikelType = BlogType::where('slug', 'artikel')->first();

        if (!$beritaType || !$artikelType) {
            $this->command->warn('BlogType tidak ditemukan. Pastikan BlogTypeSeeder sudah dijalankan terlebih dahulu.');
            return;
        }

        $blogs = [
            [
                'blog_type_id' => $beritaType->id,
                'title' => 'Peluncuran Program Baru HMRPM 2025',
                'slug' => 'peluncuran-program-baru-hmrpm-2025',
                'date' => now(),
                'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
                'excerpt' => 'HMRPM dengan bangga mempersembahkan program-program baru yang inovatif untuk tahun 2025.',
                'content' => 'Konten lengkap tentang peluncuran program baru HMRPM 2025 yang dirancang untuk meningkatkan kualitas organisasi dan memberikan dampak positif bagi semua anggota.',
                'is_published' => true,
            ],
            [
                'blog_type_id' => $artikelType->id,
                'title' => 'Pentingnya Pengembangan Sumber Daya Manusia',
                'slug' => 'pentingnya-pengembangan-sumber-daya-manusia',
                'date' => now()->subDays(5),
                'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
                'excerpt' => 'Dalam era digital ini, pengembangan SDM menjadi kunci kesuksesan organisasi modern.',
                'content' => 'Artikel mendalam tentang strategi dan pentingnya pengembangan sumber daya manusia dalam organisasi modern untuk mencapai tujuan bersama.',
                'is_published' => true,
            ],
        ];

        foreach ($blogs as $blog) {
            Blog::create($blog);
        }
    }
}
