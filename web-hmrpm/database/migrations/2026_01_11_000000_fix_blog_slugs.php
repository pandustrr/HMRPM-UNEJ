<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Generate slug untuk blog yang kosong
        $blogs = DB::table('blogs')->whereNull('slug')->orWhere('slug', '')->get();

        foreach ($blogs as $blog) {
            $slug = \Illuminate\Support\Str::slug($blog->title);
            DB::table('blogs')->where('id', $blog->id)->update(['slug' => $slug]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
