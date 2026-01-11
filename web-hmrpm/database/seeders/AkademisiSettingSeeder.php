<?php

namespace Database\Seeders;

use App\Models\AkademisiSetting;
use Illuminate\Database\Seeder;

class AkademisiSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $akademisiSettings = [
            [
                'key' => 'akademisi_hero_title',
                'type' => 'text',
                'value' => 'Akademisi HMRPM',
                'is_active' => true,
            ],
            [
                'key' => 'akademisi_hero_subtitle',
                'type' => 'text',
                'value' => 'Daftar Dosen Pembimbing Akademik dan Profesor',
                'is_active' => true,
            ],
            [
                'key' => 'akademisi_hero_bg',
                'type' => 'image',
                'value' => '/storage/logo/akademisi-hero-bg.png',
                'is_active' => true,
            ],
        ];

        foreach ($akademisiSettings as $setting) {
            AkademisiSetting::create($setting);
        }
    }
}
