<?php

namespace App\Models;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'content',
        'done',
    ];

    //establish a relationship to the user table to use in the NoteController 
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
