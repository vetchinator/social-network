import React from "react";
import { Field, Form, Formik } from "formik";
import { FilterType } from "../../redux/users/users-reducer";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/selectors/users-selector";
import s from "./Users.module.css";

type FriendFormType = "null" | "true" | "false";

type FormValuesType = {
    term: string;
    friend: FriendFormType;
};

type PropType = {
    onFilterChanged: (filter: FilterType) => void;
};

const SearchUserForm: React.FC<PropType> = React.memo((props) => {
    const onSubmit = (
        values: FormValuesType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        const filter = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false,
        };

        props.onFilterChanged(filter);
        setSubmitting(false);
    };

    const filter = useSelector(getUsersFilter);

    return (
        <div className={s.searchForm}>
            <Formik
                enableReinitialize
                initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
                onSubmit={onSubmit}
            >
                {(props) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field as="select" name="friend">
                            <option value="null">All</option>
                            <option value="true">Followed</option>
                            <option value="false">Unfollowed</option>
                        </Field>

                        <button type="submit" disabled={props.isSubmitting}>
                            Search
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
});

export default SearchUserForm;
