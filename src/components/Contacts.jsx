import React, { useEffect, useState } from "react";
import Logo from '../assets/logo.svg' ; 
import styled from 'styled-components' ;
import { useNavigate } from 'react-router-dom'; 
export default function Contacts({contacts ,currentUser , changeChat}){
    const navigate = useNavigate() ;
    const [currentUserName , setCurrentUserName] = useState(undefined) ;
    const [currentUserImage , setCurrentUserImage] = useState(undefined) ;
    const [currentSelected , setCurrentSelected] = useState(undefined) ;
 useEffect(() => {
    console.log(contacts) ;
  if(currentUser){
    setCurrentUserImage(currentUser.avatarImage) ;
    setCurrentUserName(currentUser.username) ;
  }
 } , [currentUser]) ;

 const changeCurrentChat = (index , contact) => {
  setCurrentSelected(index) ;
  changeChat(contact) ;
 }
 function handleAvatarButton () {
    navigate('/profile') ;
 }
    return (
        <>
        {
         currentUserImage && currentUserName && (
            <Container>
         <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Quick Chat</h3>
         </div>
         <div className="contacts">
            {
                contacts.map((contact ,index) => {
                    return (
                        <div className={`contact ${
                            index === currentSelected ? "selected" : ""
                        }`} key={index} onClick={() => {
                            changeCurrentChat(index ,contact) ;
                        }}>
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"  />
                        </div>
                        <div className="username">
                            <h3>{contact.username}</h3>
                        </div>
                        </div>
                    )
                })
            }
         </div>
         <div className="current-user">
         <div className="avatar">
            <button onClick={handleAvatarButton}>  <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar"  /> </button>
                          
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
         </div>
            </Container>
         )
        }
        </>
    )
}

const Container = styled.div`
width : 100vw ;
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden; 
background-color: #291421 ;
.brand{
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 1rem; 
 img{
   height: 2rem;
 }
 h3{
   color: white;
   text-transform: uppercase;

 }
}
.contacts{
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
        width: 0.2rem;
      &-thumb{
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem; 
      }
      }
    .contact{
      background-color: #ffffff50;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem ;
      gap:1rem ;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar{
        img{
          height: 4rem;

        }
      }
      .username{
        h3{
          color: white;
        }
     
      }
    }
    .selected{
      background-color: #9186f3;
    }
   }
   .current-user{
    background-color: #0d0d30;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
   .avatar{
    img{
      height: 4rem;
      margin-inline-size : 100% ;
    }
    button{
        background-color: #0d0d30;
        border: none;
       
    }
   }
   }
  .username{
   
    h2{
      color: white;
    }
  }
`