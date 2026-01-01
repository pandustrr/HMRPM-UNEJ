<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DivisionMember extends Model
{
    protected $fillable = [
        'division_id',
        'name',
        'role',
        'prodi',
        'angkatan',
        'photo',
        'video',
        'instagram',
        'linkedin',
        'email'
    ];

    public function division()
    {
        return $this->belongsTo(Division::class);
    }
}
