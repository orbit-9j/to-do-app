import { useState } from "react";

import { InertiaLink } from "@inertiajs/inertia-react";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";

export default function Note({ note }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteNote = () => {
        setShowDeleteModal(false);
    };

    return (
        <div className="note" key={note.id}>
            {note.content}
            <div>
                <InertiaLink
                    href={route("notes.edit", note.id)}
                    method="get"
                    as="button"
                >
                    <SecondaryButton>Edit</SecondaryButton>
                </InertiaLink>
                <SecondaryButton onClick={() => setShowDeleteModal(true)}>
                    Delete
                </SecondaryButton>
            </div>
            <Modal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            >
                <p>
                    Are you sure you want to delete the note: "{note.content}"?
                </p>
                <SecondaryButton onClick={() => setShowDeleteModal(false)}>
                    Cancel
                </SecondaryButton>
                <InertiaLink
                    onClick={handleDeleteNote}
                    href={route("notes.delete", note.id)}
                    method="delete"
                    as="button"
                >
                    <DangerButton>Delete</DangerButton>
                </InertiaLink>
            </Modal>
        </div>
    );
}
