import React, {useEffect} from 'react';
import Context from "./context";
import NoteList from "./components/NoteList";
import {Loader} from "./components/Loader/Loader";

const AddNote = React.lazy(() => import("./components/AddNote"));

function App() {
    const [notes, setNotes] = React.useState([
        {id: -2, completed: false, title: "Create React.js App"},
        {id: -1, completed: false, title: "Test Created App"},
        {id: 0, completed: false, title: "Deploy App on GitHub"}
    ]);

    const [isLoading, setLoading] = React.useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=15')
            .then(response => response.json())
            .then(newNotes => {
                setNotes([...notes, ...newNotes]);
                setLoading(false);
            })
    }, []);

    function toggleNoteCheckbox(id) {
        setNotes(notes.map(note => {
            if (note.id === id)
                note.completed = !note.completed;
            return note;
        }))
    }

    function removeNote(id) {
        setNotes(notes.filter(note => note.id !== id));
    }

    function addNote(title) {
        setNotes(notes.concat([{
            title,
            id: Date.now(),
            completed: false
        }]))
    }

    return (
        <Context.Provider value={{removeNote}}>
            <div className="wrapper">
                <h1>React.js Notes App</h1>

                <React.Suspense fallback={null}>
                    <AddNote onCreate={addNote}/>
                </React.Suspense>

                {
                    isLoading ? <Loader/>
                        : notes.length
                        ? <NoteList notes={notes} onToggle={toggleNoteCheckbox}/>
                        : isLoading ? null : <p>Nothing to show</p>
                }

            </div>
        </Context.Provider>
    );
}

export default App;
