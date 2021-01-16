import React ,{Component} from "react";
import './style/login.css'
import LoginForm from "../components/forms/LoginForm";
import {loginUser} from "../services/AuthService";
const axios = require('axios');


class Login extends Component{
    constructor(props) {
        super(props);
    }

    loginSubmit=async (data)=>{
        const user ={
            username: data.username,
            password: data.password,
        }
        try{
            const response = await loginUser(user);
            localStorage.setItem( 'token', response.token);
            this.props.history.push('/');

        }catch(err) {
            alert("Something went wrong. Please try again")
        }
    }
    render() {
        return (
            <div className="global-container" style={{height:'calc(100vh - 160px)'}}>
                <LoginForm getFormValue={val=>this.loginSubmit(val)}
                />
            </div>

    );
    }
}
export default Login;
