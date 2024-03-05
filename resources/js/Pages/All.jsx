import EditNote from "./EditNote";
import Note from "./Note";

//display all of the user's notes
export default function All({
    notes,
    editingNoteId,
    onEdit,
    onCloseEdit,
    edit,
}) {
    notes.sort((a, b) => a.done - b.done); //sort the notes so that completed notes are shown last

    return (
        <div className="flex flex-row gap-4 flex-wrap p-10  justify-center">
            {notes.map((note) => {
                if (edit && editingNoteId === note.id) {
                    //render EditNote if the note is being edited
                    return (
                        <EditNote
                            key={note.id}
                            note={note}
                            onCloseEdit={onCloseEdit}
                        />
                    );
                } else {
                    //render Note component for reading mode
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
