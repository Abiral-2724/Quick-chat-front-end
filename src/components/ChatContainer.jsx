import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components' ;
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from 'axios' ;
import { getAllMessagesRoute, sendMessageRoute , deleteMessageRoute } from "../utils/APIRoutes";
import {v4 as uuidv4} from 'uuid' ;


export default function ChatContainer ({currentChat , currentUser , socket}){
    console.log("current user on chat container " , currentUser) ;
    console.log("current chat on chat container = " , currentChat) ;
     const [messages , setMessages] = useState([]) ;
     const [arrivalMessage , setArrivalMessage] = useState(null) ;
    const scrollRef = useRef(null) ;

    useEffect(() => {
        const handleAllInfo = async () => {
          if (currentChat) {
            try {
              const response = await axios.post(getAllMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id
              });
              setMessages(response.data);
            } catch (error) {
              console.error("Failed to fetch messages:", error);
            }
          }
        };
        handleAllInfo();
      }, [currentChat]);

      const handleSendMsg = async (msg) => {
        try {
          await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
          });
          socket.current.emit('send-msg', {
            to: currentChat._id,
            from: currentUser._id,
            message: msg
          });
    
          const msgs = [...messages];
          msgs.push({ fromSelf: true, message: msg });
    
          setMessages(msgs);
        } catch (error) {
          console.error("Failed to send message:", error);
        }
      };

      
      useEffect(() => {
        if (socket.current) {
          const handleMessageReceive = (msg) => {
            setArrivalMessage({ fromSelf: false, message: msg });
          };
    
          socket.current.on("msg-recieve", handleMessageReceive);
    
          return () => {
            socket.current.off("msg-recieve", handleMessageReceive);
          };
        }
      }, [socket]);

      useEffect(() => {
        if (arrivalMessage) {
          setMessages((prev) => [...prev, arrivalMessage]);
        }
      }, [arrivalMessage]);
    
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);
    return (
       <>
       <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar"  />
                </div>
                <div className="username">
                 <h3>{currentChat.username}</h3>
                </div>
            </div>
        </div>
        <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
            </div>
      <ChatInput handleSendMsg = {handleSendMsg}></ChatInput>
       </Container>
       </>
    )
}

const Container = styled.div`
  .chat-header{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
 padding: 0 2rem;
 margin-top : 1rem ;
  }
  .user-details{
    display: flex;
    align-items: center;
    gap: 1rem ;
    .avatar{
      img{
        height: 3rem;
      }
    }
    .username{
      h3{
        color: whitesmoke;
      }
    }
  }
  .chat-messages{
    padding: 1rem 2rem;
    height : 500px ;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message{
      display: flex;
      align-items: center;
      .content{
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        color: #d1d1d1;
        border-radius: 1rem;
        margin-bottom: 10px;
      }
    }
    .sended{
        justify-content: flex-end;
        .content{
          background-color: #4f04ff21;
        }
      
      }
      .recieved{
        justify-content: flex-start;
        .content{
          background-color: #9900ff20;
        }
      
      }
  }
  
`