import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote} =context;
   const {note} = props
  return (
    <div className='col-md-3 my-2' > 
      
        <div className="card" >
  
  <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title my-1">{note.title}</h5>
    <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id)}}></i>
    <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{editNote(note._id,note.title,note.description, note.tag)}}></i>
    </div>
    <p className="card-text">{note.description}</p>
    
    
  </div>
</div>
    </div>
  )
}

export default Noteitem
