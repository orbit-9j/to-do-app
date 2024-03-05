import { useForm } from "@inertiajs/react";

import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Checkbox from "@/Components/Checkbox";
import TextArea from "@/Components/TextArea";
import InputLabel from "@/Components/InputLabel";

export default function EditNote({ note, onCloseEdit }) {
    /* inertia's own form handling */
    const { data, setData, patch, processing } = useForm({
        content: note.content,
        done: note.done,
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent default form submission behavior
        try {
            await patch(route("notes.update", note.id), {
                preserveScroll: true, //don't scroll to top on redirect
            });
            onCloseEdit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`note ${note.done ? "bg-lime-400" : "bg-yellow-500"}`}
        >
            <h2 className="font-bold text-xl">Edit note</h2>
            <InputLabel
                className=".label-dark"
                value={"New text"}
                htmlFor="newText"
            ></InputLabel>
            <TextArea
                name="newText"
                value={data.content}
                onChange={(e) => setData("content", e.target.value)}
            ></TextArea>
            <div className="flex gap-2 justify-center items-center">
                <InputLabel
                    className=".label-dark"
                    htmlFor="completed"
                    value={"Completed?"}
                ></InputLabel>
                <Checkbox
                    name="completed"
                    checked={data.done}
                    onChange={(e) => {
                        setData("done", e.target.checked);
                        console.log(e.target.checked);
                    }}
                ></Checkbox>
            </div>

            <div className="flex gap-2">
                <PrimaryButton
                    className="w-full"
                    disabled={processing}
                    type="submit"
                >
                    Update
                </PrimaryButton>
                <SecondaryButton className="w-full" onClick={onCloseEdit}>
                    Cancel
                </SecondaryButton>
            </div>
        </form>
    );
}
