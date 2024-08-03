import React from "react";
import styled from 'styled-components' ;
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io' ;
import {BsEmojiSmileFill} from 'react-icons/bs' ;
import { useState } from "react";
export default function ChatInput({handleSendMsg}){
    const [showEmojiPiker ,setShowEmojiPicker]  = useState(false) ;
    const [msg , setMsg] = useState("") ;

    const handleemojipickerhideshow = () => {
    setShowEmojiPicker(!showEmojiPiker) ;
   // console.log("emoji = " , showEmojiPiker) ;
    }

    const handleEmojiClick = async (event, emojiObject) => {
        const emoji = event.emoji;
        console.log("emoji object== " ,emojiObject) ;
        console.log("emoji = " , event.emoji)
       await setMsg(prevMsg => prevMsg + emoji);
        console.log("emoji message = ", msg) ;
    };
    

     const sendChat = (event) => {
        event.preventDefault() ;
        if(msg.length > 0){
            handleSendMsg(msg) ;
            setMsg('') ;
        }
     }

    return (
       <>
       <Container>
        <div className="button-container">
            <div className="emoji">
            <BsEmojiSmileFill onClick={handleemojipickerhideshow} />
                        {showEmojiPiker && (
                             <PickerContainer>
                                <Picker onEmojiClick={handleEmojiClick} />
                                </PickerContainer>
                        )}
                
            </div>
        </div>
        <form action="" className="input-container" onSubmit={(e) => sendChat(e)}>
            <input type="text" placeholder="type your message here " value={msg} onChange={(e) => setMsg(e.target.value)}/>
            <button className="submit">
                <IoMdSend></IoMdSend>
            </button>
        </form>
       </Container>
       </>
    )
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .picker{
        position: absolute;
        bottom: 3rem; /* Adjust as per your layout */
        right: 1rem; /* Adjust as per your layout */
       // background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border: 1px solid #9a86f3;
        z-index: 10; /* Ensure it's above other content */
      }
      
      }

    
  }
  .input-container {
    width: 780px;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
const PickerContainer = styled.div`
position: absolute;
bottom: 3rem; /* Adjust as per your layout */
right: 1rem; /* Adjust as per your layout */
// background-color: #080420;
box-shadow: 0 5px 10px #9a86f3;
border: 1px solid #9a86f3;
z-index: 10; /* Ensure it's above other content */
`

