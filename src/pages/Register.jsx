import React from 'react' ;
import styled from 'styled-components' ;
import { Link , useNavigate } from 'react-router-dom'; 
import Logo from '../assets/logo.svg' ; 
import { useState , useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios' ;
import { registerRoute } from '../utils/APIRoutes';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


export default function Register () {
const navigate = useNavigate() ;
  const [values , setvalues] = useState({
    username : "" , 
    email : "" ,
    password : "" , 
    confirmPassword : "" ,
  }) 
  const [password , setPassword] = useState(true) ;
  const [password1 , setPassword1] = useState(true) ;
  // if our local storage has some data then it means we are laready login ,so we can direclty navigate to the chat page
  useEffect(() => {
    if(localStorage.getItem('chat-app-user') ){
        navigate('/') ;
    }
    
  } ,[]) ;

    const handleSubmit = async (event) => {
      event.preventDefault() ;
      if(handleValidation()){
        console.log("api calling started" , registerRoute) ;
       // api calling will be done
       const {password , username , email} = values ;
       const { data } = await axios.post(registerRoute , {
        username ,
        email ,
        password ,
       }) ;
      
      if(data.status === false){
        toast.error(data.msg , toastOptions) ;
      }
      if(data.status === true){
        localStorage.setItem('chat-app-user' , JSON.stringify(data.user)) ;
      
      navigate("/setAvatar") ;
       toast.success(" Sign in Succesfully ! " , toastOptions);
      }
    }
}
   // const notify = () => toast("Wow so easy!");
   const toastOptions = {
    position : 'top-center' ,
    autoClose : 4000 , 
    pauseOnHover : true ,
    draggable : true ,
    theme: "light",
    closeOnClick: true,
   }
    const handleValidation = () => {
        const {password , confirmPassword , username , email} = values ;
        if(password === "" || confirmPassword === "" || username === "" || values === ""){
            toast.warn("Fill All the deatils" , toastOptions);
            return false ;
        }
        else if(username.length < 3){
            toast.warn("Username must contain more than 3 Character" , toastOptions);
            return false ;
        }
        else if(email.length < 3){
            toast.warn("Invalid Email" , toastOptions);
            return false ;
        }
        else if(password.length < 6){
            toast.error("Password must be of more than 6 character" , toastOptions);
            return false ;
        }
        else if(password !== confirmPassword){
            toast.error("Password and Confirm Password do not match ." , toastOptions);
            return false ;
        }else{
            return true ;
        }
    }


    const handleChange = (event) => {
      setvalues({...values , [event.target.name]:event.target.value })
      console.log(event.target.value) ;
    }
  function handlepassword(){
    setPassword(!password) ;
  }
  function handlepassword1(){
    setPassword1(!password1) ;
  }

  return (
    <>
    
    <FormContainer>
     <form onSubmit={(event) => handleSubmit(event)}> 
      <div className='brand'>
       <img src={Logo} alt="logo" /> 
       <h1>Quick Chat</h1>
      </div>
      <input 
      type="text" 
      placeholder='Username'
      name='username' 
      onChange={(e) => handleChange(e)}
       />
        <input 
      type="email" 
      placeholder='Email'
      name='email' 
      onChange={(e) => handleChange(e)}
       />
       <div className='input-password'>
       <input 
      type={password === true ? "password" : 'text'} 
      placeholder='Password'
      name='password' 
      onChange={(e) => handleChange(e)}
       />
       <span>
       {password === true ? <FaEye onClick={handlepassword}/> : <FaEyeSlash onClick={handlepassword}/>}
        </span>
       </div>
      <div className='input-password'>
        <input 
      type={password1 === true ? "password" : 'text'} 
      placeholder='Confirm Password'
      name='confirmPassword' 
      onChange={(e) => handleChange(e)}
       />
       <span>
       {password1 === true ? <FaEye onClick={handlepassword1}/> : <FaEyeSlash onClick={handlepassword1}/>}
        </span>
       </div>
       <button type="submit" >Create User</button>
       <span>already have an account ? <Link to="/login">Login</Link></span>
     </form>
    </FormContainer>
    <ToastContainer></ToastContainer>
    </>
  )
}

const FormContainer = styled.div`
height : 100vh ; 
width: 100vw ;
display: flex ;
flex-direction: column; 
justify-content: center;
gap: 1rem;
align-items: center; 
background-color: #131324;
.brand{
  display: flex; 
  align-items: center; 
  gap: 1rem; 
  justify-content: center;
  img{
    height: 5rem;
  }
  h1{
    color: white;
    text-transform: uppercase;

  }

}
form{
  display: flex ; 
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
  input {
      background-color: transparent;
      padding: 1rem; 
      border: 0.1rem solid #4e0eff; 
      border-radius: 0.4rem;
      color: white; 
    //  width: 100%;
      font-size: 1rem; 
      &:focus{
       border: 0.1rem solid #997af0;
       outline: none;
      }
  }
  button {
    background-color: #997af0;
    color: white ;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.6rem;
    font-size: 1rem; 
    text-transform: uppercase;
    transition: 0.5s ease-in-out ;
    &:hover{
      background-color: #4e0eff;
    }

   }
   span{
    color: white;
    text-transform: uppercase ;
    a{
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
   }

}

` ;