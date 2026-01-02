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
        Schema::create('divisions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('period_id')->constrained('periods')->onDelete('cascade');
            $table->string('name');
            $table->text('short_desc');
            $table->longText('description');
            $table->string('icon_image')->nullable();
            $table->string('image')->nullable();
            $table->string('color')->nullable(); // Tailwind classes e.g. "from-red-500 to-black"
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('divisions');
    }
};
