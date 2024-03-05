import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import All from "./All";
import NewNote from "./NewNote";

import PrimaryButton from "@/Components/PrimaryButton";

//main page of the application
export default function Dashboard({ auth, notes }) {
    /* --------------------- New Note logic start ---------------------*/
    //show NewNote component only if the user clicks on the "+" button
    const [showNewNote, setShowNewNote] = useState(false);

    const toggleVisibility = () => {
        setShowNewNote(!showNewNote);
    };

    const handleNoteAdded = () => {
        setShowNewNote(false); //hide NewNote component when the note has been added
    };
    /* --------------------- New Note logic end ---------------------*/

    /* --------------------- Edit Note logic start ---------------------*/
    const [editingNoteId, setEditingNoteId] = useState(null); //store the note that is to be edited
    const [localEdit, setLocalEdit] = useState(false); //state that dictates whether a note is being edited

    //set the states when editing is initiated
    const handleEditNote = (noteId) => {
        setEditingNoteId(noteId);
        setLocalEdit(true);
    };

    //reset the states when the editing is cancelled or completed
    const handleCloseEdit = () => {
        setEditingNoteId(null);
        setLocalEdit(false);
    };
    /* --------------------- Edit Note logic end ---------------------*/

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <div className="flex flex-row items-center justify-center gap-4 mb-4">
                        <h1 className="font-semibold text-3xl text-gray-800 dark:text-gray-200 leading-tight ">
                            My notes
                        </h1>
                        <PrimaryButton
                            id="big"
                            aria-label="Create new note"
                            onClick={toggleVisibility}
                        >
                            +
                        </PrimaryButton>
                    </div>
                    {/* conditionally render component depending on the state */}
                    {showNewNote && <NewNote onNoteAdded={handleNoteAdded} />}
                </div>
            }
        >
            <Head title="My notes" /> {/* page title */}
            <All
                notes={notes}
                editingNoteId={editingNoteId}
                onEdit={handleEditNote}
                onCloseEdit={handleCloseEdit}
                edit={localEdit}
            />
        </AuthenticatedLayout>
    );
}
