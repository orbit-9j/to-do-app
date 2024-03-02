import { useForm } from "@inertiajs/react";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await patch(route("notes.update", note.id), {
                preserveScroll: true,
            });
            onFinishEdit();
        } catch (error) {
            console.error(error);
            // Handle error if necessary
        }
    };

    const handleCancel = () => {
        onCancelEdit(); // Call onCancelEdit function when cancel button is clicked
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`note ${note.done ? "done" : ""}`}
        >
            <InputLabel value={"New text"} htmlFor="newText"></InputLabel>
            <TextInput
                name="newText"
                value={data.content}
                onChange={(e) => setData("content", e.target.value)}
            ></TextInput>
            <InputLabel htmlFor="completed" value={"Completed?"}></InputLabel>
            <Checkbox
                name="completed"
                checked={data.done}
                onChange={(e) => {
                    setData("done", e.target.checked);
                    console.log(e.target.checked); // Log the value of the checkbox
                }}
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
