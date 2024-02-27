import { useState } from "react";

import EditNote from "./EditNote";
import Note from "./Note";

export default function All({ auth, notes, edit }) {
    const [filteredNotes, setFilteredNotes] = useState([]);

    // Filter notes based on current user's ID
    useState(() => {
        setFilteredNotes(notes.filter((note) => note.user_id === auth.user.id));
    }, [notes, auth.user.id]);

    console.log(edit);

    return (
        <div>
            {filteredNotes.map((note) =>
                edit ? (
                    <EditNote key={note.id} note={note} />
                ) : (
                    <Note key={note.id} note={note} />
                )
            )}
        </div>
    );
}
