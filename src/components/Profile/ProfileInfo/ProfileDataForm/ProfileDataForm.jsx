import react from "react";
import { useForm } from "react-hook-form";
import s from "./../ProfileInfo.module.css";

const ProfileDataForm = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {...props.profile},
    });
    const validators = {
        required: "Field is fill",
    };
    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div>
                <button type="submit">Save</button>
                <div>
                    <span className={s.titleCharacter}>lookingForAJobDescription</span>:
                    <input name="fullName" placeholder="Name" ref={register({ ...validators })} />
                    {errors.fullName && <p>{errors.fullName.message}</p>}

                </div>
                <div>
                    <div>
                        <label>
                            lookingForAJob
                            <input name="lookingForAJob" type="checkbox" ref={register} />
                        </label>
                    </div>
                </div>
                <div>
                    <span className={s.titleCharacter}>AboutMe</span>:
                    <input name="aboutMe" placeholder="AboutMe" ref={register({ ...validators })} />
                    {errors.aboutMe && <p>{errors.aboutMe.message}</p>}
                </div>

                <div>
                    <span className={s.titleCharacter}>lookingForAJobDescription</span>:
                    <input name="lookingForAJobDescription" placeholder="lookingForAJobDescription" ref={register({ ...validators })} />
                    {errors.lookingForAJobDescription && <p>{errors.lookingForAJobDescription.message}</p>}
                </div>
                <div>
                    <span>
                        <span className={s.titleCharacter}>contacts</span>:
                        {Object.keys(props.profile.contacts).map((key) => {
                            return <div key={key}>
                                <span>{key}</span>
                                <input name={"contacts."+ key} placeholder={key} ref={register} />
                            </div>
                            // <Contact key={key} title={key} value={props.profile.contacts[key]}></Contact>;
                        })}
                    </span>
                </div>
            </div>
            {props.formServerError ? <div className={s.serverError}>{ props.formServerError }</div> : null}
        </form>
    );
};

export default ProfileDataForm;
