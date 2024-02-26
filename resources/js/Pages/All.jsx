import { useState } from "react";

import EditNote from "./EditNote";
import { InertiaLink } from "@inertiajs/inertia-react";

import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";

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
                    <div>
                        <InertiaLink
                            href={route("notes.edit", note.id)}
                            method="get"
                            as="button"
                        >
                            <SecondaryButton
                                children={"edit"}
                            ></SecondaryButton>
                        </InertiaLink>
                        <InertiaLink
                            href={route("notes.delete", note.id)}
                            method="delete"
                            as="button"
                        >
                            <DangerButton children={"delete"}></DangerButton>
                        </InertiaLink>
                    </div>
                </div>
            ))}
        </div>
    );
}
