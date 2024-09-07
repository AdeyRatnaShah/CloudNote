import React,{useContext} from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

const Home = (props) => {

  return (
    <div>
      
      <Notes showAlert ={props.showAlert}/>
    </div>
  )
}

export default Home
