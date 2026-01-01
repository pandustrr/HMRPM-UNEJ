<?php

namespace Database\Seeders;

use App\Models\Division;
use Illuminate\Database\Seeder;

class DivisionMemberSeeder extends Seeder
{
    public function run(): void
    {
        $ph = Division::where('name', 'Pengurus Harian')->first();
        if ($ph) {
            $ph->members()->updateOrCreate(
                ['name' => 'Antigravity'],
                [
                    'role' => 'Ketua Umum HMRPM',
                    'prodi' => 'TRPM',
                    'angkatan' => '22',
                    'photo' => '/storage/logo/hmrpm.png',
                    'video' => 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4'
                ]
            );
            $ph->members()->updateOrCreate(
                ['name' => 'Fulan bin Fulan'],
                ['role' => 'Wakil Ketua Umum', 'prodi' => 'TRPM', 'angkatan' => '22', 'photo' => '/storage/logo/hmrpm.png']
            );
        }

        $psdm = Division::where('name', 'Divisi PSDM')->first();
        if ($psdm) {
            $psdm->members()->updateOrCreate(
                ['name' => 'Koordinator PSDM'],
                ['role' => 'Coordinator', 'prodi' => 'TRPM', 'angkatan' => '22', 'photo' => '/storage/logo/hmrpm.png']
            );
        }

        $kominfo = Division::where('name', 'Divisi Kominfo')->first();
        if ($kominfo) {
            $kominfo->members()->updateOrCreate(
                ['name' => 'Koordinator Kominfo'],
                ['role' => 'Coordinator', 'prodi' => 'TRPM', 'angkatan' => '22', 'photo' => '/storage/logo/hmrpm.png']
            );
        }

        // Add more default members for other divisions if needed
        $divisions = Division::whereNotIn('name', ['Pengurus Harian', 'Divisi PSDM', 'Divisi Kominfo'])->get();
        foreach ($divisions as $div) {
            $div->members()->updateOrCreate(
                ['name' => 'Koordinator ' . str_replace('Divisi ', '', $div->name)],
                ['role' => 'Coordinator', 'prodi' => 'TRPM', 'angkatan' => '22', 'photo' => '/storage/logo/hmrpm.png']
            );
        }
    }
}
