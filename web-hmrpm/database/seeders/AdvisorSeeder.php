<?php

namespace Database\Seeders;

use App\Models\Advisor;
use Illuminate\Database\Seeder;

class AdvisorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data Pembina
        Advisor::create([
            'type' => 'pembina',
            'name' => 'Ir. Robertus Sidartawan, S.T., M.T., IPM',
            'nidn' => '0010037006',
            'nip_nik' => '197003101997021001',
            'birth_place' => 'Jember',
            'birth_date' => '1970-03-10',
            'gender' => 'Laki-laki',
            'religion' => 'Katolik',
            'rank' => 'Penata/IIId',
            'position' => 'Kaprodi',
            'university' => 'Universitas Jember',
            'address' => 'Jl. Kalimantan 37 – Kampus Tegalboto kotak pos 159 Jember 68121',
            'phone_office' => '(0331) 484977',
            'address_home' => 'Sun City, Jl. Piere Tendean Blok JV 01, Jember',
            'phone_home' => '082221000752',
            'email' => 'iborsidarta@gmail.com',
            'image' => '/storage/profile/pembina.jpg', // Pastikan file ini ada atau ganti dengan null
            'is_active' => true,
        ]);

        // Data Pendamping Dummy
        Advisor::create([
            'type' => 'pendamping',
            'name' => 'Nama Pendamping Dummy, S.T., M.T.',
            'nidn' => '0000000000',
            'nip_nik' => '198500000000000000',
            'birth_place' => 'Jember',
            'birth_date' => '1985-01-01',
            'gender' => 'Laki-laki',
            'religion' => 'Islam',
            'rank' => 'Penata Muda / IIIa',
            'position' => 'Dosen Pembimbing',
            'university' => 'Universitas Jember',
            'address' => 'Jl. Kalimantan 37 – Kampus Tegalboto',
            'phone_office' => null,
            'address_home' => null,
            'phone_home' => null,
            'email' => 'pendamping@mail.com',
            'image' => '/storage/profile/pendamping.jpg',
            'is_active' => true,
        ]);
    }
}
