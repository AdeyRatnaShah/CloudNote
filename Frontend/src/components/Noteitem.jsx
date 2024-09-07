import React, { useContext } from 'react'
// import NoteContext from '../context/notes/NoteContext'
import NoteContext from '../context/notes/noteContext';
const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote} =context;
   const {note,updateNote,showAlert} = props
  return (
    <div className='col-md-3 my-2' > 
      
        <div className="card" >
  
  <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title my-1">{note.title}</h5>
    <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id);
     showAlert("Deleted successfully","success")}}></i>
    <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
    </div>
    <p className="card-text">{note.description}</p>
    
    
  </div>
</div>
    </div>
  )
}

export default Noteitem
