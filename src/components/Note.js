import {useContext} from 'react';
import Context from "../context";
import PropTypes from "prop-types";

const styles = {
    li: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: ".5rem 1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: ".5rem"
    },
    input: {
        marginRight: "1rem"
    }
};

function Note({note, index, onChange}) {
    const {removeNote} = useContext(Context);

    const classes = [];
    if (note.completed)
        classes.push("note-done");

    return (
        <li style={styles.li}>
            <span className={classes.join(" ")}>
                <input type="checkbox" checked={note.completed} style={styles.input}
                       onChange={() => onChange(note.id)}/>
                <strong>{index + 1}.</strong>
                &nbsp;
                {note.title}
            </span>

            <button className="rm" onClick={removeNote.bind(null, note.id)}>&times;</button>
        </li>
    )
}

Note.propTypes = {
    note: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Note;