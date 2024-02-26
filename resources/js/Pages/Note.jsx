import { useState } from "react";

import { InertiaLink } from "@inertiajs/inertia-react";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";

export default function Note({ note }) {
    return (
        <div className="note" key={note.id}>
            {note.content}
            <div>
                <InertiaLink
                    href={route("notes.edit", note.id)}
                    method="get"
                    as="button"
                >
                    <SecondaryButton children={"edit"}></SecondaryButton>
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
    );
}
