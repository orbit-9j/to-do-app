import { useState } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";

export default function Note({ note, onEdit }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteNote = () => {
        setShowDeleteModal(false);
    };

    return (
        <div
            className={`note ${
                note.done ? "bg-lime-400" : "bg-yellow-500"
            }  align-center `}
            key={note.id}
        >
            <section className=" overflow-auto ">{note.content}</section>

            <div className="flex gap-2">
                <PrimaryButton
                    className="w-full"
                    onClick={() => onEdit(note.id)}
                >
                    Edit
                </PrimaryButton>
                <SecondaryButton
                    className="w-full"
                    onClick={() => setShowDeleteModal(true)}
                >
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
                <div className="flex gap-2 justify-center">
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
                </div>
            </Modal>
        </div>
    );
}
