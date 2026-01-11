<?php

namespace Database\Seeders;

use App\Models\BlogSetting;
use Illuminate\Database\Seeder;

class BlogSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $blogSettings = [
            [
                'key' => 'blog_hero_title',
                'type' => 'text',
                'value' => 'Blog HMRPM',
                'is_active' => true,
            ],
            [
                'key' => 'blog_hero_subtitle',
                'type' => 'text',
                'value' => 'Berita dan artikel terkini dari HMRPM UNEJ',
                'is_active' => true,
            ],
            [
                'key' => 'blog_hero_bg',
                'type' => 'image',
                'value' => '/storage/logo/blog-hero-bg.png',
                'is_active' => true,
            ],
        ];

        foreach ($blogSettings as $setting) {
            BlogSetting::create($setting);
        }
    }
}
