import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input name="login" placeholder="Login" ref={register({ required: "Fill field"})} />
                {errors.login && <p>{errors.login.message}</p>}
            </div>
            <div>
                <input name="password" placeholder="password" ref={register({ required: "Fill field"})} />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
                <label>
                    <input name="rememberMe" type="checkbox" ref={register} />
                    remember me
                </label>
            </div>
            <div>
                <input type="submit" />
            </div>
        </form>
    );
};

const Login = (props) => {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm {...props}/>
        </div>
    );
};

export default Login;
