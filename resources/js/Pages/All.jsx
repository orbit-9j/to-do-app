import EditNote from "./EditNote";
import Note from "./Note";

export default function All({
    auth,
    notes,
    editingNoteId,
    onEdit,
    onCancelEdit,
    onFinishEdit,
    edit,
}) {
    notes.sort((a, b) => a.done - b.done);
    return (
        <div className="flex flex-row gap-4 flex-wrap p-10  justify-center">
            {notes.map((note) => {
                if (edit && editingNoteId === note.id) {
                    // Render EditNote if edit is true and the note is being edited
                    return (
                        <EditNote
                            key={note.id}
                            note={note}
                            onCancelEdit={onCancelEdit}
                            onFinishEdit={onFinishEdit} // Pass onFinishEdit function
                        />
                    );
                } else {
                    // Render Note component for display mode
                    return (
                        <Note
                            key={note.id}
                            note={note}
                            onEdit={() => onEdit(note.id)}
                        />
                    );
                }
            })}
        </div>
    );
}
