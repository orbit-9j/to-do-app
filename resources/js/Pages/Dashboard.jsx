import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import All from "./All";
import NewNote from "./NewNote";

import PrimaryButton from "@/Components/PrimaryButton";

export default function Dashboard({ auth, notes, edit }) {
    const [showNewNote, setShowNewNote] = useState(false);

    const toggleVisibility = () => {
        if (showNewNote == false) {
            setShowNewNote(true);
        } else {
            setShowNewNote(false);
        }
    };

    const handleNoteAdded = () => {
        setShowNewNote(false);
    };

    const [editingNoteId, setEditingNoteId] = useState(null);
    const [localEdit, setLocalEdit] = useState(edit);

    const handleEditNote = (noteId) => {
        setEditingNoteId(noteId);
        setLocalEdit(true);
    };

    const handleCancelEdit = () => {
        setEditingNoteId(null);
    };

    // Function to handle finishing edit
    const handleFinishEdit = () => {
        setLocalEdit(false); // Set edit to false when editing is complete
        setEditingNoteId(null); // Reset editingNoteId
    };

    /* console.log("dashboard: ", edit); */

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <div className="flex flex-row items-center justify-center gap-3 mb-3">
                    <h1 className="font-semibold text-2xl text-gray-800 dark:text-gray-200 leading-tight ">
                        My notes
                    </h1>
                    <PrimaryButton id="big" aria-label="Create new note"  onClick={toggleVisibility}>+</PrimaryButton>
                </div >
                {showNewNote && <NewNote onNoteAdded={handleNoteAdded} />}
                </div>
                
            }
        >
            <Head title="My notes" />
            
            <div>
                <All
                    notes={notes}
                    auth={auth}
                    editingNoteId={editingNoteId}
                    onEdit={handleEditNote}
                    onCancelEdit={handleCancelEdit}
                    onFinishEdit={handleFinishEdit}
                    edit={localEdit}
                />
            </div>
        </AuthenticatedLayout>
    );
}
