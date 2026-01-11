<?php

namespace Database\Seeders;

use App\Models\Academic;
use Illuminate\Database\Seeder;

class AcademicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $academics = [
            [
                'type' => 'dosen',
                'name' => 'Dr. Ir. Suprijono, M.T.',
                'nidn' => '0011027304',
                'nip_nik' => '197304111997021001',
                'birth_place' => 'Jember',
                'birth_date' => '1973-04-11',
                'gender' => 'Laki-laki',
                'religion' => 'Islam',
                'rank' => 'Lektor Kepala/IIIb',
                'position' => 'Dosen',
                'university' => 'Universitas Jember',
                'address' => 'Jl. Karimata 23, Jember',
                'phone_office' => '(0331) 484977',
                'address_home' => 'Jl. Raya Karimata, Jember',
                'phone_home' => '08123456789',
                'email' => 'suprijono@unej.ac.id',
                'image' => '/storage/logo/hmrpm.png',
                'video' => null,
                'is_active' => true,
            ],
            [
                'type' => 'dosen',
                'name' => 'Ir. Herry Suhartanto, M.T.',
                'nidn' => '0010058005',
                'nip_nik' => '197005101997021002',
                'birth_place' => 'Surabaya',
                'birth_date' => '1970-05-10',
                'gender' => 'Laki-laki',
                'religion' => 'Islam',
                'rank' => 'Lektor/IIIb',
                'position' => 'Dosen',
                'university' => 'Universitas Jember',
                'address' => 'Jl. Pendidikan 45, Jember',
                'phone_office' => '(0331) 484977',
                'address_home' => 'Jl. Pendidikan 45, Jember',
                'phone_home' => '08234567890',
                'email' => 'herry@unej.ac.id',
                'image' => '/storage/logo/hmrpm.png',
                'video' => null,
                'is_active' => true,
            ],
        ];

        foreach ($academics as $academic) {
            Academic::create($academic);
        }
    }
}
