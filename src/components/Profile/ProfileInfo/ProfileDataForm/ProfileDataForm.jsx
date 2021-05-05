import React from "react";
import { useForm } from "react-hook-form";
import s from "./../ProfileInfo.module.css";

const ProfileDataForm = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: { ...props.profile },
    });
    const validators = {
        required: "Field is fill",
    };
    return (
        <form className={s.profileData} onSubmit={handleSubmit(props.onSubmit)}>
            <div>
                <div className={s.titleBlock + " " + s.lntxt}>Main information</div>
                <div className={s.characterRow}>
                    <span className={s.titleCharacter}>Full name:</span>
                    <input name="fullName" placeholder="Name" ref={register({ ...validators })} />
                    {errors.fullName && <p>{errors.fullName.message}</p>}
                </div>
                <div className={s.characterRow}>
                    <input id="lookingForAJob" name="lookingForAJob" type="checkbox" ref={register} />
                    <label className={s.labelCheckbox} htmlFor="lookingForAJob">
                        <span className={s.titleCharacter}>Looking for a job</span>
                    </label>
                </div>
                <div className={s.characterRow}>
                    <span className={s.titleCharacter}>About me:</span>
                    <input name="aboutMe" placeholder="AboutMe" ref={register({ ...validators })} />
                    {errors.aboutMe && <p>{errors.aboutMe.message}</p>}
                </div>
                <div className={s.characterRow}>
                    <span className={s.titleCharacter}>Looking for a job description:</span>
                    <input
                        name="lookingForAJobDescription"
                        placeholder="lookingForAJobDescription"
                        ref={register({ ...validators })}
                    />
                    {errors.lookingForAJobDescription && <p>{errors.lookingForAJobDescription.message}</p>}
                </div>
                <div className={s.titleBlock + " " + s.lntxt}>Contacts</div>
                <div className={s.characterCol}>
                    {Object.keys(props.profile.contacts).map((key) => {
                        return (
                            <div className={s.characterRow} key={key}>
                                <span className={s.titleCharacter}>{key}</span>
                                <input name={"contacts." + key} placeholder={key} ref={register} />
                            </div>
                        );
                    })}
                </div>
                <button type="submit">Save</button>
            </div>
            {props.serverErrorMessage ? <div className={s.serverError}>{props.serverErrorMessage}</div> : null}
        </form>
    );
};

export default ProfileDataForm;