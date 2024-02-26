import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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
        <AuthenticatedLayout user={auth.user}>
            <form onSubmit={handleSubmit}>
                {/* <InputError message={errors} /> */} {/* throws error */}
                <label htmlFor="newText"></label>
                <textarea
                    name="newText"
                    value={data.content}
                    onChange={(e) => setData("content", e.target.value)}
                ></textarea>
                <label htmlFor="completed">Completed?</label>
                <input
                    name="completed"
                    type="checkbox"
                    value={data.done}
                    onChange={(e) => setData("done", e.target.value)}
                ></input>
                <button disabled={processing}>Update note</button>
                {/* <PrimaryButton></PrimaryButton> */}
            </form>
        </AuthenticatedLayout>
    );
}
