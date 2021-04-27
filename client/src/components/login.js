import axios from 'axios';
import React, {useState} from 'react'
import { GoogleLogin } from 'react-google-login';
import {Redirect} from 'react-router-dom';
import conf from '../common/conf';

var emsg = "";

function Login(props) {

    const [done, setdone] = useState(false);
    const [error, seterror] = useState(false);

    const responseGoogle = (res) => {
        let profile = res.profileObj;
        props.setusername(profile.name);
        props.setmail(profile.email);
        props.setimg_url(profile.imageUrl);

        axios.post(conf.BASEURL+"/api/cred", { name : profile.name, email : profile.email, img_url : profile.imageUrl })
            .then( res => {
                if(res.data === "OK") setdone(true);
                else {
                    emsg = "Something went wrong!!";
                    seterror(true);
                }
            })
            .catch( err => {
                emsg = "Server Error!!";
                seterror(true);
            })
    };
    
    const responseGoogleFailed = (res) => {
        emsg = res.error;
        seterror(true); 
    }

    return (
        <div className="flex-c-jc">
            <h2>Login using Google OAuth</h2>
            <GoogleLogin
                clientId={conf.CLIENTID} 
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogleFailed}
                cookiePolicy={'single_host_origin'}
            />
            {
                error ? <div className="error"> {emsg} </div> : <></>
            }
            {
                done ? (<Redirect to="/" />) : <></>
            }
        </div>
    )
}

export default Login
