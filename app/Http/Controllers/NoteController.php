<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class NoteController extends Controller
{
    public function displayAll()  {
        $user = Auth::user();
        $notes = $user->notes;
        $notes->transform(function ($note) {
            $note->content = Crypt::decryptString($note->content);
            return $note;
        });
        return Inertia::render('Dashboard', ['notes'=> $notes, "edit" =>false]); 
    }

    public function saveNew(Request $request)
    {
        \Log::info($request->all());
        $request->validate([
            'contents' => 'required',
        ]);

        $newNote = new Note;
        $newNote->user_id = Auth::id();
        $newNote->content = Crypt::encryptString($request->input('contents'));
        //$newNote->content = $request->input('contents');
        $newNote->done = false;
        
        $newNote->save();
        
        return Inertia::location(route('dashboard', ["edit" =>false]));
    }

    public function editNote(Note $note){
        $note->content = Crypt::decryptString($note->content);

        $user = Auth::user();
        $notes = $user->notes;
        $notes->transform(function ($note) {
            $note->content = Crypt::decryptString($note->content);
            return $note;
        });
        return Inertia::render ("Dashboard", ['notes' => $notes, "edit" =>true]);
    }

    public function updateNote(Note $note, Request $request){
       $note->update([
        "content"=> Crypt::encryptString($request->content),
        "done"=> $request->input('done'),
       ]);
       //dd($note->done); 
       return Inertia::location(route('dashboard', ["edit" =>false]));
    }

    public function deleteNote(Note $note){
        $note->delete();
        return Inertia::location(route('dashboard', ["edit" =>false]));
    }
}
