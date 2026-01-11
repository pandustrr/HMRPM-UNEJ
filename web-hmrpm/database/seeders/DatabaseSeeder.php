<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'username' => 'testuser',
            'email' => 'test@example.com',
        ]);

        $this->call([
            AdminUserSeeder::class,
            InitialDataSeeder::class,
            DivisionSeeder::class,
            DivisionMemberSeeder::class,
            AdvisorSeeder::class,
            ProgramKerjaSeeder::class,
            ProkerSettingSeeder::class,
            BlogTypeSeeder::class,
            BlogSeeder::class,
            BlogSettingSeeder::class,
            AcademicSeeder::class,
            AkademisiSettingSeeder::class,
            HomeSettingSeeder::class,
        ]);
    }
}
