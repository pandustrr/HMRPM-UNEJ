<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'blog_type_id',
        'title',
        'slug',
        'date',
        'image',
        'content',
        'excerpt',
        'is_published'
    ];

    public function blogType()
    {
        return $this->belongsTo(BlogType::class);
    }
}
