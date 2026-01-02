<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advisor extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'nidn',
        'nip_nik',
        'birth_place',
        'birth_date',
        'gender',
        'religion',
        'rank',
        'position',
        'university',
        'address',
        'phone_office',
        'address_home',
        'phone_home',
        'email',
        'image',
        'video',
        'is_active'
    ];

    protected $casts = [
        'birth_date' => 'date',
        'is_active' => 'boolean'
    ];
}
