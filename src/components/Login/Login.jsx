import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";

const LoginForm = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data, e) => {
        console.log(data);
        e.target.reset();
    };

    const validators = {
        required: "Field is fill",
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    className={styles.inputText}
                    name="login"
                    placeholder="Login"
                    ref={register({
                        ...validators,
                        maxLength: {
                            value: 15,
                            message: "Max symbols is 15",
                        }
                    })}
                />
                 <p>{errors.login && errors.login.message}</p>
            </div>
            <div>
                <input
                    className={styles.inputText}
                    name="password"
                    placeholder="password"
                    ref={register({ ...validators })}
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
                <label className={styles.label}>
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
        <div className={styles.login}>
            <h1>Login</h1>
            <LoginForm {...props} />
        </div>
    );
};

export default Login;
