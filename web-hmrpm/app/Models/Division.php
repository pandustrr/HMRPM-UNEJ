<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    protected $fillable = [
        'period_id',
        'name',
        'short_desc',
        'description',
        'icon_image',
        'image',
        'color'
    ];

    public function period()
    {
        return $this->belongsTo(Period::class);
    }

    public function members()
    {
        return $this->hasMany(DivisionMember::class);
    }

    public function programKerjas()
    {
        return $this->hasMany(ProgramKerja::class);
    }
}
