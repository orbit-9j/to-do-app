import { useState } from "react";

import EditNote from "./EditNote";
import Note from "./Note";

export default function All({
    auth,
    notes,
    editingNoteId,
    onEdit,
    onCancelEdit,
    onFinishEdit,
    edit,
}) {
    const [filteredNotes, setFilteredNotes] = useState([]);

    // Filter notes based on current user's ID
    useState(() => {
        setFilteredNotes(notes.filter((note) => note.user_id === auth.user.id));
    }, [notes, auth.user.id]);

    /* console.log("all: ", edit); */

    return (
        <div id="grid">
            {filteredNotes.map((note) => {
                if (edit && editingNoteId === note.id) {
                    // Render EditNote if edit is true and the note is being edited
                    return (
                        <EditNote
                            key={note.id}
                            note={note}
                            onCancelEdit={onCancelEdit}
                            onFinishEdit={onFinishEdit} // Pass onFinishEdit function
                        />
                    );
                } else {
                    // Render Note component for display mode
                    return (
                        <Note
                            key={note.id}
                            note={note}
                            onEdit={() => onEdit(note.id)}
                        />
                    );
                }
            })}
        </div>
    );
}
