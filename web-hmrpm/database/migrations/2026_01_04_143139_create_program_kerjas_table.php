<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('program_kerjas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('division_id')->constrained()->onDelete('cascade');
            $table->string('title'); // e.g., "Upgrading Staff"
            $table->date('event_date'); // Full date: day/month/year
            $table->text('description'); // Isi kegiatan
            $table->json('documentation')->nullable(); // Array of file paths
            $table->string('status')->default('Progress'); // Progress, Selesai, Perencanaan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_kerjas');
    }
};
