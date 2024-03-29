<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', [NoteController::class, 'displayAll'])->middleware(['auth', 'verified'])->name('dashboard');

//note functionality is only available to logged in users
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/saveNote', [NoteController::class, 'saveNew'])->name('notes.save');
    Route::patch('/update-note/{note}', [NoteController::class, 'updateNote'])->name('notes.update');
    Route::delete('/delete-note/{note}', [NoteController::class, 'deleteNote'])->name('notes.delete');
});


require __DIR__.'/auth.php';
