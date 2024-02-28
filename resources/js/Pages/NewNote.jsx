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
                content: data.content, // Include content in the request
                done: data.done, // Include done status in the request
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
                checked={data.done}
                onChange={(e) => setData("done", e.target.checked)}
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
