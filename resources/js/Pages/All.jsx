import { useState } from "react";

import EditNote from "./EditNote";
import Note from "./Note";

export default function All({ auth, notes }) {
    const [filteredNotes, setFilteredNotes] = useState([]);

    // Filter notes based on current user's ID
    useState(() => {
        setFilteredNotes(notes.filter((note) => note.user_id === auth.user.id));
    }, [notes, auth.user.id]);

    return (
        <div>
            {filteredNotes.map((note) => (
                <Note note={note} />
            ))}
        </div>
    );
}
