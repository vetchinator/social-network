import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import styles from "./Login.module.css";
import { login } from '../../redux/auth-reducer';
import { Redirect } from "react-router-dom";
import { RootState } from "../../redux/redux-store";

type PropFormType = {
    formServerError: string | null,
    captchaUrl: string | null,
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type DataType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

const LoginForm: React.FC<PropFormType>= (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange"
      });
    const onSubmit = (data: DataType) => {
        props.login(data.email, data.password, data.rememberMe, data.captcha);
    };

    const validators = {
        required: "Field is fill",
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div >
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
                    type="password"
                    ref={register({ ...validators })}
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className={styles.characterRow}>
                    <input id="rememberMe" name="rememberMe" type="checkbox" ref={register} />
                    <label className={styles.labelCheckbox} htmlFor="rememberMe">
                        <span className={styles.titleCharacter}>Remember me</span>
                    </label>
            </div>
            {props.captchaUrl && <img src={props.captchaUrl} alt="Captcha" /> } 
            {props.captchaUrl && 
            <div>
                <input
                    className={styles.inputText}
                    name="captcha"
                    placeholder="captcha"
                    ref={register({ ...validators })}
                />
                {errors.captcha && <p>{errors.captcha.message}</p>}
            </div>}   
            <div>
                <button type="submit">Send</button>
            </div>
            {props.formServerError ? <div className={styles.serverError}>{ props.formServerError }</div> : null}
        </form>
    );
};

const Login: React.FC<PropType> = (props) => {
    if (props.isAuthenticated) {
        return <Redirect to={'/profile'} />;
    }
    return (
        <div className={styles.loginFormWrapper}>
            <h1>Login</h1>
            <LoginForm formServerError={props.formServerError} captchaUrl={props.captchaUrl} login={props.login} />
        </div>
    );
};

type MapStateToPropsType = {
    isAuthenticated: boolean,
    formServerError: string | null,
    captchaUrl: string | null,
};
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
};
type OwnPropsType = {};

type PropType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        formServerError: state.auth.formServerError,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, RootState>(mapStateToProps, {
    login,
})(Login);
