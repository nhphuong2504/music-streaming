import React from 'react'
import {app} from '../config/firebase.config'
import {getAuth, signInWithPopup} from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button'
import { useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { validateUser } from '../api';
import {LoginBackground} from '../assets/img'


const Login = ({setAuth}) => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const [{user}, dispatch] = useStateValue();
    const loginGoogle = async () => {
        await signInWithPopup(firebaseAuth,provider).then((userCred) => {
            if(userCred){
                setAuth(true);
                window.localStorage.setItem("auth","true");

                firebaseAuth.onAuthStateChanged((userCred) => {
                   if(userCred){
                    userCred.getIdToken().then((token) => {
                      validateUser(token).then((data) => {
                        dispatch({
                          type : actionType.SET_USER,
                          user : data
                        })
                      })
                        
                      })
                    navigate("/", {replace : true})
                   }
                   else{
                    setAuth(false);
                    dispatch({
                      type : actionType.SET_USER,
                      user : null
                    })
                    navigate("/login")
                   }
                  })
            }
        })
    }

    useEffect(() => {
        if(window.localStorage.getItem("auth") === "true"){
            navigate('/', {replace : true})
        }
    }, [])
  return (
<div >
    <div className ="relative w-screen h-screen">
      <img src={LoginBackground}></img>
        <div className = "absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <GoogleButton id="googleButton" onClick={loginGoogle} />
        </div>
    </div>
</div>
  )
}

export default Login