<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Period extends Model
{
    protected $fillable = ['year', 'is_active', 'is_archived', 'hero_image', 'hero_type', 'theme_color'];

    public function divisions()
    {
        return $this->hasMany(Division::class);
    }
}
