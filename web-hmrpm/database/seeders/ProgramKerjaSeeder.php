<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProgramKerja;
use App\Models\Division;

class ProgramKerjaSeeder extends Seeder
{
    public function run(): void
    {
        // Get all divisions
        $divisions = Division::all();

        if ($divisions->isEmpty()) {
            $this->command->warn('No divisions found. Please seed divisions first.');
            return;
        }

        $programKerjas = [
            [
                'title' => 'Upgrading Staff',
                'event_date' => '2025-02-15',
                'description' => 'Upgrading Staff bertujuan untuk meningkatkan kompetensi dan kinerja seluruh pengurus himpunan. Materi yang diberikan mencakup administrasi, manajemen waktu, dan strategi komunikasi efektif.',
                'documentation' => [],
            ],
            [
                'title' => 'Workshop Desain Grafis',
                'event_date' => '2025-03-10',
                'description' => 'Workshop desain grafis untuk meningkatkan kemampuan anggota dalam membuat konten visual yang menarik. Peserta akan belajar menggunakan tools seperti Canva, Figma, dan Adobe Illustrator.',
                'documentation' => [],
            ],
            [
                'title' => 'Seminar Nasional Teknik Mesin',
                'event_date' => '2025-04-20',
                'description' => 'Seminar nasional dengan tema "Inovasi Teknologi dalam Industri 4.0". Menghadirkan pembicara dari industri dan akademisi terkemuka di bidang teknik mesin.',
                'documentation' => [],
            ],
            [
                'title' => 'Bakti Sosial',
                'event_date' => '2025-05-05',
                'description' => 'Kegiatan bakti sosial ke desa sekitar kampus. Meliputi pembagian sembako, pengajaran anak-anak, dan perbaikan fasilitas umum.',
                'documentation' => [],
            ],
            [
                'title' => 'Pelatihan Kepemimpinan',
                'event_date' => '2025-06-12',
                'description' => 'Pelatihan kepemimpinan untuk calon pengurus periode berikutnya. Materi mencakup leadership skills, team building, dan conflict resolution.',
                'documentation' => [],
            ],
            [
                'title' => 'Kompetisi Robotika',
                'event_date' => '2025-07-18',
                'description' => 'Kompetisi robotika tingkat universitas. Peserta akan merancang dan memprogram robot untuk menyelesaikan berbagai tantangan teknis.',
                'documentation' => [],
            ],
            [
                'title' => 'Study Excursie',
                'event_date' => '2025-08-25',
                'description' => 'Kunjungan industri ke pabrik manufaktur terkemuka. Mahasiswa akan melihat langsung penerapan ilmu teknik mesin di dunia industri.',
                'documentation' => [],
            ],
            [
                'title' => 'Rapat Kerja Tahunan',
                'event_date' => '2025-09-30',
                'description' => 'Evaluasi program kerja tahunan dan perencanaan strategi untuk periode mendatang. Melibatkan seluruh pengurus dan perwakilan anggota.',
                'documentation' => [],
            ],
        ];

        foreach ($programKerjas as $index => $proker) {
            // Distribute program kerja across divisions
            $division = $divisions[$index % $divisions->count()];

            ProgramKerja::create([
                'division_id' => $division->id,
                'title' => $proker['title'],
                'event_date' => $proker['event_date'],
                'description' => $proker['description'],
                'documentation' => $proker['documentation'],
                'status' => $index < 4 ? 'Selesai' : 'Progress',
            ]);
        }

        $this->command->info('Program Kerja seeded successfully!');
    }
}
