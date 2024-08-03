import React from "react";
import styled from 'styled-components';
import Robot from '../assets/robot.gif';
import { useNavigate } from 'react-router-dom';

export default function Welcome({ currentUser }) {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem('chat-app-user'));
    console.log("storedUser:", storedUser);
    console.log("welcome, currentUser:", currentUser);

    // If currentUser prop is not passed, try to get it from localStorage
    if (!currentUser && storedUser) {
        currentUser = storedUser;
    }

    return (
        <>
            <Container>
                <div>
                    <img src={Robot} alt="robot" />
                    <h1>
                        Welcome , <span>{currentUser ? currentUser.username : 'Guest'}</span>
                    </h1>
                    <h3>Please Select a Chat to start Messaging</h3>
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;

    img {
        margin-left: 170px;
        margin-top: -140px;
        height: 23rem;
    }

    h1 {
        margin-left: 200px;
        margin-top: -20px;
    }

    span {
        color: #695798;
    }

    h3 {
        margin-left: 200px;
        margin-top: 10px;
    }
`;
