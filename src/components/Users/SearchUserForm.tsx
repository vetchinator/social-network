import React from "react";
import { Field, Form, Formik } from "formik";
import { FilterType } from "../../redux/users/users-reducer";

type FormValuesType = {
  term: string,
  friend: 'null' | 'true' | 'false'
}

type PropType = {
    onFilterChanged: (filter: FilterType) => void
}

const SearchUserForm: React.FC<PropType> = (props) => {

  const onSubmit = (values: FormValuesType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
      const filter = {
          term: values.term,
          friend: values.friend ==='null' ? null : values.friend === 'true' ? true : false
      }

      props.onFilterChanged(filter);
      setSubmitting(false);
  }

  return (
      <div>
      <Formik
        initialValues={{ term: '', friend: 'null' }}
        onSubmit={onSubmit}
      >
        {props => (
          <Form>
            <Field type="text" name="term" />
            <Field as="select" name="friend">
             <option value="null">All</option>
             <option value="true">Followed</option>
             <option value="false">Unfollowed</option>
           </Field>

            <button type="submit" disabled={props.isSubmitting} >Search</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchUserForm;