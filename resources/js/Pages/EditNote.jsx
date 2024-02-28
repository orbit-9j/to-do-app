import { useForm } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Checkbox from "@/Components/Checkbox";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";

export default function EditNote({ auth, note, onCancelEdit, onFinishEdit }) {
    const { data, setData, patch, processing, recentlySuccessful, errors } =
        useForm({
            content: note.content,
            done: note.done,
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("notes.update", note.id), { preserveScroll: true })
            .then(() => {
                // Call the function to finish editing
                onFinishEdit();
            })
            .catch((errors) => {
                // Handle errors if necessary
                console.error(errors);
            });
    };

    const handleCancel = () => {
        onCancelEdit(); // Call onCancelEdit function when cancel button is clicked
    };

    return (
        <form onSubmit={handleSubmit} className="note">
            {/* <InputError message={errors} /> */} {/* throws error */}
            <InputLabel value={"New text"} htmlFor="newText"></InputLabel>
            <TextInput
                name="newText"
                value={data.content}
                onChange={(e) => setData("content", e.target.value)}
            ></TextInput>
            <InputLabel htmlFor="completed" value={"Completed?"}></InputLabel>
            <Checkbox
                name="completed"
                value={data.done}
                onChange={(e) => setData("done", e.target.value)}
            ></Checkbox>
            <PrimaryButton
                disabled={processing}
                children={"Update note"}
                type="submit"
            ></PrimaryButton>
            <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
        </form>
    );
}
