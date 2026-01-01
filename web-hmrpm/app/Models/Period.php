<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Period extends Model
{
    protected $fillable = ['year', 'is_active', 'hero_image', 'theme_color'];

    public function divisions()
    {
        return $this->hasMany(Division::class);
    }
}
