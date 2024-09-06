import React,{useContext, useState} from 'react'
import NoteContext from '../context/notes/NoteContext'
const AddNote = () => {
    const context = useContext(NoteContext);
    const [note,setNote] = useState({
        "title":"",
        "description":"",
        "tag":"default"
    })
    const {addNote} = context;
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className="container my-3">
                <h1>Add a note</h1>
                <form className='mx-4 my-4'>
                    <div className="mb-3 my-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" name = "description" onChange={onChange} id="description" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" name = "tag" onChange={onChange} id="tag" />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
