<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AkademisiSetting extends Model
{
    protected $fillable = ['key', 'type', 'value', 'is_active'];
}
