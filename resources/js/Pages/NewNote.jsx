import { useForm } from "@inertiajs/react";

import SecondaryButton from "@/Components/SecondaryButton";
import TextArea from "@/Components/TextArea";
import InputLabel from "@/Components/InputLabel";

export default function NewNote({ onNoteAdded }) {
    const { data, setData, post, processing } = useForm();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        post(route("notes.save"), {
            content: data.contents,
            onSuccess: () => {
                onNoteAdded(); // Call the callback function to hide the NewNote component
            },
        });
    };

    return (
        <div className=" note bg-pink-400 m-auto">
            <h2 className="font-bold text-xl">New note</h2>
            <form
                method="post"
                onSubmit={handleSubmit}
                acceptCharset="UTF-8"
                className=" flex gap-2 flex-col h-full justify-between"
            >
                <div>
                    <InputLabel
                        className=".label-dark"
                        htmlFor="contents"
                        value={"Note contents"}
                    ></InputLabel>
                    <TextArea
                        name="contents"
                        placeholder="Note text"
                        onChange={(e) => setData("contents", e.target.value)}
                    ></TextArea>
                </div>

                <SecondaryButton disabled={processing} type="submit">
                    Create note
                </SecondaryButton>
            </form>
        </div>
    );
}
