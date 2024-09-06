import React, { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial =[]
    const [notes,setNotes] = useState(notesInitial)
    //get all notes
    const getNotes =async ()=>{
        const url = `${host}/notes/fetchallnotes`
        const response = await fetch(url, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkODM5OGFmZmZiNmM4NjQwMGIzNzE5In0sImlhdCI6MTcyNTQ0NjkxOH0.EGa3ksxWjsg3gQxsiWMS0-RbQtPqyBXqko8-cxzWGrw"
            },
        });
        const json = await response.json();
        setNotes(json)
    };
    
    //Add a note
    const addNote = async (title, description,tag)=>{
        //to do api call
        const url = `${host}/notes/addnewnote`
        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkODM5OGFmZmZiNmM4NjQwMGIzNzE5In0sImlhdCI6MTcyNTQ0NjkxOH0.EGa3ksxWjsg3gQxsiWMS0-RbQtPqyBXqko8-cxzWGrw"
            },
            body: JSON.stringify({title,description,tag})
        });
        // const json =  response.json();
        console.log("description");
        const note = await response.json();
            
         // Check if the response status is 200 (OK)
        //  if (response.ok) {/
            // const note = await response.json(); // Get the newly added note from the response
            setNotes(notes.concat(note)); // Add the new note to state
        // } else {
        //     console.error("Failed to add note. Please check your input.");
        // }
    }

    //delete a note
    const deleteNote =async (id)=>{
         //to do api call
        const url = `${host}/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkODM5OGFmZmZiNmM4NjQwMGIzNzE5In0sImlhdCI6MTcyNTQ0NjkxOH0.EGa3ksxWjsg3gQxsiWMS0-RbQtPqyBXqko8-cxzWGrw"
            },
        });
        console.log('Deleting a node with id '+id)
        const newNotes = notes.filter((note)=>{
            // return note._id!=id;
            return note._id!==id
        })
        setNotes(newNotes)
    }
    // edit a note
    const editNote = async (id, title, description, tag)=>{
        //to do api call
        const url = `${host}/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkODM5OGFmZmZiNmM4NjQwMGIzNzE5In0sImlhdCI6MTcyNTQ0NjkxOH0.EGa3ksxWjsg3gQxsiWMS0-RbQtPqyBXqko8-cxzWGrw"
            },
            body: JSON.stringify({title,description,tag})
        });
        const json =  await response.json();
        //Logic to edit in client
        // for(let index= 0;index <notes.length ;index++){
        //     const element = notes[index];
        //     if(element._id ===id){
        //         element.title = title;
        //         element.description = description;
        //         element.tag = tag;
        //     }
        // }

        // Logic to update the note in the state
        const newNotes = notes.map((note) =>
            note._id === id ? { ...note, title, description, tag } : note
        );
        setNotes(newNotes);
    }


    // const [state, setState] = useState(s1);
  
    return(
        <NoteContext.Provider value ={{notes,addNote,editNote, deleteNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;