import React from "react";
import {Formik} from "formik";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import Button from "react-bootstrap/Button";

type LoginFormType = {
    loginHandler: (user: string, pass: string) => any
}

const schema = yup.object().shape({
    userEmail: yup.string().required(),
    password: yup.string().required()
});

const LoginForm: React.FC<LoginFormType> = ({loginHandler}) => {
    return (
        <Formik
            onSubmit={(values) => {
                loginHandler(values.userEmail, values.password);
            }}
            initialValues={{
                userEmail: "",
                password: ""
            }}
            validationSchema={schema}
        >
            {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="loginFormEmail">
                        <Form.Label column={false}>Username or Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="userEmail"
                            value={values.userEmail}
                            onChange={handleChange}
                            placeholder="Enter Username or Email"
                            isInvalid={touched.userEmail && !!errors.userEmail}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.userEmail}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="loginFormPassword">
                        <Form.Label column={false}>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    )
};

export default LoginForm;