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
        Schema::create('advisors', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['pembina', 'pendamping']);
            $table->string('name');
            $table->string('nidn')->nullable();
            $table->string('nip_nik')->nullable();
            $table->string('birth_place')->nullable();
            $table->date('birth_date')->nullable();
            $table->enum('gender', ['Laki-laki', 'Perempuan'])->nullable();
            $table->string('religion')->nullable();
            $table->string('rank')->nullable(); // Pangkat/Golongan
            $table->string('position')->nullable(); // Jabatan
            $table->string('university')->nullable();
            $table->text('address')->nullable(); // Alamat Kantor/Umum
            $table->string('phone_office')->nullable();
            $table->text('address_home')->nullable();
            $table->string('phone_home')->nullable();
            $table->string('email')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('advisors');
    }
};
