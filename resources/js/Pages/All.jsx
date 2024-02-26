import { useState } from "react";

import EditNote from "./EditNote";
import { InertiaLink } from "@inertiajs/inertia-react";

export default function All({ auth, notes }) {
    const [filteredNotes, setFilteredNotes] = useState([]);

    // Filter notes based on current user's ID
    useState(() => {
        setFilteredNotes(notes.filter((note) => note.user_id === auth.user.id));
    }, [notes, auth.user.id]);

    return (
        <div>
            {filteredNotes.map((note) => (
                <div className="note" key={note.id}>
                    {note.content}
                    <InertiaLink
                        href={route("notes.edit", note.id)}
                        method="get"
                        as="button"
                    >
                        edit
                    </InertiaLink>
                    <form></form>
                    <form>
                        <button>delete</button>
                    </form>
                </div>
            ))}
        </div>
    );
}
