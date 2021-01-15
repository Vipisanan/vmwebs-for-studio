import React from 'react';
import '../../pages/style/login.css';
import {useFormik} from "formik";
import * as Yup from "yup";

const LoginForm =(props)=>{
    const { data} = props;

    const formik = useFormik({
        initialValues: {},
        validationSchema: Yup.object({

        }),
        onSubmit: values => {
            const { getFormValue } = props;
            if (getFormValue) {
                getFormValue(values);
            }
        },
    });
    const getInputValue=event=>{
        formik.setFieldValue(event.target.name, event.target.value);
    }

    return (
        <div className="card login-form">
            <div className="card-body">
                <h3 className="card-title text-center">Log in to Line and love</h3>
                <div className="card-text">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email"
                                   className="form-control form-control-sm"
                                   aria-describedby="emailHelp"
                                   id={'email'}
                                   name={'email'}
                                   value={formik.values.name}
                                   onChange={event=>getInputValue(event)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <a href="#" style={{float:'right',fontSize:'12px'}}>Forgot password?</a>
                            <input type="password"
                                   className="form-control form-control-sm"
                                   id={'password'}
                                   name={'password'}
                                   value={formik.values.name}
                                   onChange={event=>getInputValue(event)}
                            />
                        </div>
                        <button  type={'submit'}  className="btn btn-primary btn-block">Sign in</button>

                        <div className="sign-up">
                            Don't have an account? <a href="#">Create One</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
export default LoginForm;
