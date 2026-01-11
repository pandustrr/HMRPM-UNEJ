<?php

namespace Database\Seeders;

use App\Models\HomeSetting;
use Illuminate\Database\Seeder;

class HomeSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $homeSettings = [
            [
                'key' => 'home_hero_title',
                'type' => 'text',
                'value' => 'Selamat Datang di HMRPM UNEJ',
                'is_active' => true,
            ],
            [
                'key' => 'home_hero_subtitle',
                'type' => 'text',
                'value' => 'Himpunan Mahasiswa Rekayasa Perangkat Masak Universitas Jember',
                'is_active' => true,
            ],
            [
                'key' => 'home_hero_bg',
                'type' => 'image',
                'value' => '/storage/logo/home-hero-bg.png',
                'is_active' => true,
            ],
            [
                'key' => 'home_about_text',
                'type' => 'textarea',
                'value' => 'HMRPM adalah organisasi mahasiswa yang berkomitmen untuk mengembangkan minat dan bakat di bidang rekayasa perangkat masak.',
                'is_active' => true,
            ],
        ];

        foreach ($homeSettings as $setting) {
            HomeSetting::create($setting);
        }
    }
}
