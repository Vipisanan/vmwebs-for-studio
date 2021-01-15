import React ,{Component} from "react";
import './style/login.css'
import LoginForm from "../components/forms/LoginForm";
class Login extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="global-container" style={{height:'calc(100vh - 160px)'}}>
                <LoginForm/>
            </div>

    );
    }
}
export default Login;
