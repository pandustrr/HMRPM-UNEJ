<?php

namespace Database\Seeders;

use App\Models\ProkerSetting;
use Illuminate\Database\Seeder;

class ProkerSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prokerSettings = [
            [
                'key' => 'proker_hero_title',
                'type' => 'text',
                'value' => 'Program Kerja HMRPM',
                'is_active' => true,
            ],
            [
                'key' => 'proker_hero_subtitle',
                'type' => 'text',
                'value' => 'Rencana Kerja dan Program Divisi HMRPM Tahun 2025',
                'is_active' => true,
            ],
            [
                'key' => 'proker_hero_bg',
                'type' => 'image',
                'value' => '/storage/logo/proker-hero-bg.png',
                'is_active' => true,
            ],
        ];

        foreach ($prokerSettings as $setting) {
            ProkerSetting::create($setting);
        }
    }
}
