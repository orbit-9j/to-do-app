<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class NoteController extends Controller
{
    private function decryptNotes($notes){
        return $notes->transform(function ($note) {
            $note->content = Crypt::decryptString($note->content);
            return $note;
        });
    }

    //load in all of the notes by the user who is currently logged in
    private function getAllNotes(){
        $user = Auth::user(); //get current user
        return $user->notes; //using the relationship established in the User model
    }

    //display all of the user's notes on the dashboard
    public function displayAll()  {
        $notes = $this->getAllNotes();

        if ($notes->isEmpty()) {
            $notes=[];
        }
        else{
            $notes = $this->decryptNotes($notes);   
        }

        return Inertia::render('Dashboard', ['notes'=> $notes, "edit" =>false]);
    }

    //add a new note
    public function saveNew(Request $request)
    {
        //do not proceed if input is empty
        $request->validate([
            'contents' => 'required',
        ]);

        //create note instance and assign values to it
       $newNote = Note::create([
            'user_id' => Auth::id(),
            'content' => Crypt::encryptString($request->input('contents')),
            'done' => false,
        ]);
        
        return Inertia::location(route('dashboard', ["edit" =>false]));
    }

    //edit an existing note
    public function editNote(Note $note){
        //$note->content = Crypt::decryptString($note->content); //because i don't want the editing component to open in a separate page, i'm using react to conditionally render the editNote component using state variables. the routing does not concern itself with the individual note. this function is currently redundant, but may be needed if the note editing functionality were to change
        $notes = $this->decryptNotes($this->getAllNotes());

        return Inertia::render ("Dashboard", ['notes' => $notes, "edit" =>true]);
    }

    //push changes in the note to the database
    public function updateNote(Note $note, Request $request){
       $note->update([
        "content"=> Crypt::encryptString($request->content),
        "done"=> $request->input('done'),
       ]);
       return Inertia::location(route('dashboard', ["edit" =>false]));
    }

    public function deleteNote(Note $note){
        $note->delete();
        return Inertia::location(route('dashboard', ["edit" =>false]));
    }
}
