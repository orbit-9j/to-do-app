import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import All from "./All";
import NewNote from "./NewNote";
import EditNote from "./EditNote";

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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        My notes
                    </h2>
                    <PrimaryButton onClick={toggleVisibility}>+</PrimaryButton>
                </div>
            }
        >
            <Head title="My notes" />
            {showNewNote && <NewNote onNoteAdded={handleNoteAdded} />}
            <div>
                <All notes={notes} auth={auth} edit={edit} />
            </div>
        </AuthenticatedLayout>
    );
}
