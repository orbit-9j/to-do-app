import { useForm } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Checkbox from "@/Components/Checkbox";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";

export default function EditNote({ auth, note }) {
    const { data, setData, patch, processing, recentlySuccessful, errors } =
        useForm({
            content: note.content,
            done: note.done,
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("notes.update", note.id), { preserveScroll: true });
    };

    return (
        <form onSubmit={handleSubmit}>
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
            ></PrimaryButton>
        </form>
    );
}
