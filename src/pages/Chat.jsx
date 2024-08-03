import React, { useEffect, useRef, useState } from 'react' ;
import styled from 'styled-components' ;
import axios from 'axios' ;
import { useNavigate } from 'react-router-dom'; 
import { allUsersRoute , host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from "socket.io-client" ;


export default function Chat () {

   const socket = useRef()


    const navigate = useNavigate() 
    const [contacts , setContacts] = useState([]) ;
    const [currentUser , setCurrentUser] = useState(undefined) ;
    useEffect( () => {
        const checkUser = async () => {
        if(!localStorage.getItem('chat-app-user') ){
            // you are not loged in
          navigate('/login')
        }else{
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user"))) ;
        }
    }
    checkUser() ;
        
    } , [navigate]) ;

   useEffect(() => {
     if(currentUser){
        socket.current = io(host) ;
        socket.current.emit("add-user" , currentUser._id) ;
     }
   } , [currentUser]) ;

    useEffect( () => {
        const fetchContacts = async () => {
      if(currentUser){
       
        if(currentUser.isAvatarImageSet){
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`) ;
            setContacts(data.data) ;
        }else{
            navigate('/setAvatar') ;
        }
      }
    }
    fetchContacts() ;
    } , [currentUser , navigate]) ;
    const [currentChat , setCurrentChat] = useState(undefined) ;
    
const handleChatChange = (chat) => {
setCurrentChat(chat) ;
}
function handlelogoutfeature(){
    localStorage.removeItem("chat-app-user");
    navigate('/register') ;
 }
 console.log("current user" , currentUser) ;
console.log("chat page = " , currentUser) ;
console.log("current chat = " , currentChat) ;
  return (
    <>
   <div className="sign-out-button">
                <button className='sign-out' onClick={handlelogoutfeature}>Sign Out</button>
            </div>
    <Container>
      <div className="container">
        
        <div className='c1'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat = {handleChatChange}></Contacts>
        </div>
        <div className='c2'>
        {
            currentChat === undefined ? 
          ( <Welcome currentUser={currentUser} ></Welcome> ) : 
          (<ChatContainer currentChat={currentChat} currentUser = {currentUser} 
          socket = {socket}
          > </ChatContainer>)

        }
        </div>
       
      </div>
      
    </Container>
    </>
  )
}

const Container = styled.div`
height: 93vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #0a0a26;

.container{
  height: 76vh;
  width: 85vw;
  background-color: #020202ab;
  display: flex;
  justify-content: center ;
  margin-top: -100px;
}
.c1{
    height: 76vh;
    width: 26vw;
    display: flex;
    justify-content: center ;
    
  }
  .c2{
    height: 76vh;
    width: 85vw;
    display: flex;
    
  }
`