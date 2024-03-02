import { useState } from "react";
import { useForm } from "@inertiajs/react";

import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";

export default function NewNote({ onNoteAdded }) {
    const { data, setData, post, processing } = useForm();
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        post(route("notes.save"), {
            content: data.contents,
            onSuccess: () => {
                setSuccessMessage("Note added!");
                onNoteAdded(); // Call the callback function to hide the NewNote component
            },
        });
    };

    return (
        <div>
            <h3>New note</h3>
            {successMessage && <p>{successMessage}</p>}
            <form method="post" onSubmit={handleSubmit} acceptCharset="UTF-8">
                <InputLabel
                    htmlFor="contents"
                    value={"Note contents"}
                ></InputLabel>
                <TextInput
                    name="contents"
                    placeholder="Note text"
                    onChange={(e) => setData("contents", e.target.value)}
                ></TextInput>
                <SecondaryButton disabled={processing} type="submit">
                    Create note
                </SecondaryButton>
            </form>
        </div>
    );
}
