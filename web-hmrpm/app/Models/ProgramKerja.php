<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgramKerja extends Model
{
    protected $fillable = [
        'division_id',
        'title',
        'event_date',
        'description',
        'documentation',
        'status',
    ];

    protected $casts = [
        'documentation' => 'array',
        'event_date' => 'date',
    ];

    public function division()
    {
        return $this->belongsTo(Division::class);
    }
}
