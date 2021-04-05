import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import styles from "./Login.module.css";
import { login } from '../../redux/auth-reducer';
import { Redirect } from "react-router-dom";

const LoginForm = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange"
      });
    const onSubmit = (data) => {
        props.login(data.email, data.password, data.rememberMe);
    };

    const validators = {
        required: "Field is fill",
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    className={styles.inputText}
                    name="email"
                    placeholder="email"
                    ref={register({
                        ...validators,
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && <p>{errors.email.message}</p>}
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
            {props.formServerError ? <div className={styles.serverError}>{ props.formServerError }</div> : null}
        </form>
    );
};

const Login = (props) => {
    if (props.isAuthenticated) {
        return <Redirect to={'/profile'} />;
    }
    return (
        <div className={styles.login}>
            <h1>Login</h1>
            <LoginForm {...props} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        formServerError: state.auth.formServerError
    }
}

export default  connect(mapStateToProps, {login})(Login);
