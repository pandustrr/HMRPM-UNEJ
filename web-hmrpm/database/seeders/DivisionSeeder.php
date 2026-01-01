<?php

namespace Database\Seeders;

use App\Models\Period;
use App\Models\Division;
use Illuminate\Database\Seeder;

class DivisionSeeder extends Seeder
{
    public function run(): void
    {
        $activePeriod = Period::where('is_active', true)->first();

        if (!$activePeriod) {
            $activePeriod = Period::create([
                'year' => '2024/2025',
                'is_active' => true,
                'hero_image' => '/storage/logo/about-hero-bg.png',
                'hero_type' => 'image',
                'theme_color' => 'bg-brand-red'
            ]);
        }

        $divisions = [
            [
                'name' => 'Pengurus Harian',
                'short_desc' => 'Jantung organisasi yang mengelola administrasi, keuangan, dan koordinasi internal.',
                'description' => 'Pengurus Harian (PH) bertanggung jawab atas stabilitas dan jalannya roda organisasi secara keseluruhan. PH bertugas memastikan visi dan misi HMRPM tercapai melalui koordinasi yang efektif antar divisi.',
                'icon_image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400',
                'image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
                'color' => 'from-brand-red to-brand-maroon',
            ],
            [
                'name' => 'Divisi PSDM',
                'short_desc' => 'Pengembangan Sumber Daya Mahasiswa untuk mencetak kader unggul.',
                'description' => 'Divisi PSDM berfokus pada pengembangan kualitas internal anggota HMRPM melalui berbagai pelatihan, kaderisasi, dan kegiatan yang membangun karakter serta kompetensi teknis.',
                'icon_image' => 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400',
                'image' => 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800',
                'color' => 'from-brand-maroon to-black',
            ],
            [
                'name' => 'Divisi Kominfo',
                'short_desc' => 'Pusat komunikasi dan informasi digital HMRPM.',
                'description' => 'Divisi Komunikasi dan Informasi bertanggung jawab dalam mengelola citra organisasi, media sosial, website, serta publikasi informasi penting kepada seluruh anggota dan publik.',
                'icon_image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
                'color' => 'from-brand-red to-orange-900',
            ],
            [
                'name' => 'Divisi Hubungan Luar',
                'short_desc' => 'Menjalin sinergi dan kolaborasi dengan pihak eksternal.',
                'description' => 'Divisi Hubungan Luar berperan sebagai jembatan antara HMRPM dengan organisasi mahasiswa lain, alumni, dunia industri, serta instansi terkait untuk menciptakan kolaborasi yang bermanfaat.',
                'icon_image' => 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400',
                'image' => 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
                'color' => 'from-black via-brand-maroon to-brand-red',
            ],
            [
                'name' => 'Divisi Kewirausahaan',
                'short_desc' => 'Membangun kemandirian finansial dan jiwa usaha mahasiswa.',
                'description' => 'Divisi Kewirausahaan fokus pada pengembangan unit bisnis organisasi dan pelatihan soft skill entrepreneurship bagi anggota untuk meningkatkan kemandirian dana.',
                'icon_image' => 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=400',
                'image' => 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800',
                'color' => 'from-amber-600 to-brand-maroon',
            ],
            [
                'name' => 'Divisi Minat Bakat',
                'short_desc' => 'Wadah kreativitas, seni, dan olahraga mahasiswa RPM.',
                'description' => 'Divisi ini bertujuan menggali dan menyalurkan potensi non-akademik mahasiswa RPM di bidang olahraga, seni, dan kreativitas lainnya untuk meningkatkan prestasi non-akademik.',
                'icon_image' => 'https://images.unsplash.com/photo-1511267671478-45c7e002ea48?auto=format&fit=crop&q=80&w=400',
                'image' => 'https://images.unsplash.com/photo-1511267671478-45c7e002ea48?auto=format&fit=crop&q=80&w=800',
                'color' => 'from-brand-red to-rose-900',
            ],
            [
                'name' => 'Divisi Keilmuan',
                'short_desc' => 'Meningkatkan wawasan dan prestasi akademik mahasiswa.',
                'description' => 'Divisi Keilmuan bertanggung jawab dalam menyelenggarakan kegiatan yang menunjang prestasi akademik mahasiswa, seperti lomba karya tulis, riset, dan workshop teknik.',
                'icon_image' => 'https://images.unsplash.com/photo-1454165833767-0275080064f7?auto=format&fit=crop&q=80&w=400',
                'image' => 'https://images.unsplash.com/photo-1454165833767-0275080064f7?auto=format&fit=crop&q=80&w=800',
                'color' => 'from-brand-maroon to-zinc-900',
            ]
        ];

        foreach ($divisions as $div) {
            $activePeriod->divisions()->updateOrCreate(
                ['name' => $div['name']],
                $div
            );
        }
    }
}
