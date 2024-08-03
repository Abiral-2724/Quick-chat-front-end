import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react' ;
import { Link , useNavigate } from 'react-router-dom'; 

export default function Basic() {
    const navigate = useNavigate() ;
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

    if(!currentUser){
        return <div>Loading...</div>;
    }

    function handlechatbutton(){
        navigate('/') ;
    }
    function handlelogoutfeature(){
        localStorage.removeItem("chat-app-user");
        navigate('/register') ;
     }
     function handlechangeprofilebutton(){
        navigate('/setAvatar') ;
     }
    
  return (
    <div className='profile-page'>
        <div className="sign-out-button">
                <button className='sign-out' onClick={handlelogoutfeature}>Sign Out</button>
            </div>
    <div className="profile" style={{ }}>
         
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4" style={{ borderRadius: '15px' , height:'600px', 
            width:'400px' ,border:'1px solid black' ,display:'flex' , justifyContent:'center' ,
            alignItems:'center'
            }} >
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                  <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="avatar"  style={{ width: '200px', borderRadius: '10px' , marginTop:'-70px'}} />
                   
                  </div>
                  <div className="sign-out-button" style={{backgroundColor:'#295372'}} >
                     <button onClick={handlechangeprofilebutton} className='sign-out'>Change Profile</button>
                    </div>
                  <div style={{ width: '200px', borderRadius: '10px' ,display:'flex' , justifyContent:'center' ,
            alignItems:'center' ,gap:'3rem' ,flexDirection:'column' ,marginTop:'20px'}}>
                    <h3 className='name'>{currentUser.username}</h3>
                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#295372' }}>
                      <div>
                        <h3>{currentUser.email}</h3>
                      </div>
                    
                    </div>
                    <div className="sign-out-button" style={{backgroundColor:'#295372'}} >
                     <button onClick={handlechatbutton} className='sign-out'>Chat</button>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
    </div>
  );
}