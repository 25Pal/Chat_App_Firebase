import React, { useState } from 'react'
import { loginRoute } from '../utils/APIRoute';
import axios from "axios"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [Ivalue, setIValue] = useState({
        username: "",
        userpassword: "",
        email:""


    })

    const [showPass, setShowPass] = useState(false)

    const toastOptions = {
        position: "bottom-right",
        ResizeObserverSize: "small",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const loginn = async () => {
        const response = await signInWithPopup(firebaseAuth, provider);
        console.log(response);
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Setting Input value in State value ^^^^^^^^^^^^^^^^^^^^^^\\

    const handleChange = (e) => {

        const { name, value } = e.target;
        setIValue(() => {
            return {
                ...Ivalue,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (handleValidation()) {
            const { username, email,userpassword } = Ivalue;
            const { data } = await axios.post(loginRoute, { username, email ,userpassword });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {

                localStorage.setItem('chat-app-user', JSON.stringify(data.checkUser));
                const user = await JSON.parse(localStorage.getItem("chat-app-user"));
                user.Online = true;
                localStorage.setItem('chat-app-user', JSON.stringify(user));
                // alert("Logged In Sucessfully !");
                navigate("/");
            }
        }
    }

    const handleValidation = () => {
      const { username, email, userpassword} = Ivalue;

      if (username === "") {
          toast.error("Username Required!", toastOptions);
          return false;
      } else if (email === "") {
          toast.error("Email is Required!", toastOptions);
          return false;
      } else if (!email.includes("@")) {
          toast.error("Invalid Email !", toastOptions);
          return false;
      } else if (userpassword === "") {
          toast.error("Password is Required !", toastOptions);
          return false;
      } else if (userpassword.length < 7) {
          toast.error("Password Must be Strong !", toastOptions);
          return false;
      } else {
          return true;
      }
    }

    return (
        <>
            <Container>
                <form onSubmit={(e) => handleSubmit(e)} >
                    <div className='brand'>
                        <h1>Quick Chat</h1>
                    </div>
                    <input
                        type="text"
                        placeholder='Username'
                        name="username"
                        onChange={(e) => handleChange(e)}
                        value={Ivalue.username}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        onChange={(e) => handleChange(e)}
                        value={Ivalue.email}
                    />
                    <div className='merge'>
                        <input
                            type={!showPass ? "password" :'text'}
                            placeholder='Password'
                            name='userpassword'
                            onChange={(e) => handleChange(e)}
                            value={Ivalue.userpassword}
                        />
                        <div className='see' onClick={()=>setShowPass(!showPass)}>
                            {!showPass?<VisibilityIcon /> : <VisibilityOffOutlinedIcon/>}
                        </div>

                    </div>

                    <button type='submit'>Sign Up</button>
                    <div className='logo' onClick={loginn}>
                        <div  >
                            Sign up with
                        </div>
                        <div className='gicon'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png' alt='img' />

                        </div>
                    </div>
                    <span> Already have an Account ? <NavLink to={"/Login"}>Sign In</NavLink>    </span>
                </form>

            </Container>
            <ToastContainer />
        </>
    )
}

export default Login


const Container = styled.div`

    height: 100vh;
    width:100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap:10rem;
    align-items: center;
    background-color: #f9f6f6;

    form{
     
        display: flex;
        flex-direction: column;
        gap:2rem;
        background-color: #5bfc05c6;
        border-radius : 2rem ;
        padding : 3rem 5rem;
    
    h1{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input{
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid  #1b0823;
        box-shadow:  5px 1px 10px #2d3639;
        border-radius: 0.4rem;
        color: rgb(26, 25, 25);
        width: 100%;
        font-size: 1rem;

        &:focus{
            border: 0.1rem solid #8ae1ec;
            outline:none;
         }
       
      }

      button{
        background-color :#1c0809;
        color: white;
        padding : 1rem 2rem ;
        border:none;
        font-weight :bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        transition: 0.5s ease-in-out;
        

        &:hover{
            background-color: #291717;
        }
        

      }
      span{
            color: #251717;
            text-transform: uppercase;
            a{
                color: #4e0eff;
                text-decoration:none;
                font-weight: bold;
                
            }
        }
        .logo{
            display: flex;
            gap :1rem;
            align-items: center;
            justify-content: center;
        }
        .gicon{
           
            width: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #5e5959;
            gap:1rem;
            cursor: pointer;

            img{
                height: 1.5rem;
                border-radius: 1rem;
                transition: 0.5s ease-in-out;
                &:hover{
                border-radius: 3rem;
                width: 3rem;
                height: 3rem;
                 background-color: #f2ecec;
        }
    }
  }   
  
  .merge{
      
       display: flex;
       justify-content: center;
       align-items: center;
       box-sizing: border-box;
       border: 0.1rem solid  #19191a;
       width: 110%;
       box-shadow:  5px 1px 10px #3e3f40;
       border-radius: 0.4rem;
      
       padding: 0.8rem;

       input{

       background-color: transparent;
       padding: 0.1rem;
       border: none;
       box-shadow:  0px 0px  #171818;
       border-radius: 0.4rem;
       color: rgb(16, 17, 17);
       width: 100%;
       font-size: 1rem;
       }
       &:focus{
            border: 1rem solid #4e23c4;
            outline:none;
         }
      .see{
          color:rgb(9, 9, 9); 
          cursor: pointer;
        }
        
        
    }
  
  }
`
