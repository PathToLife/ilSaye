import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Formik} from "formik";
import React from "react";

type TSendMessage = {
    sendMessage: any
}

const SendMessage:React.FC<TSendMessage> = ({sendMessage}) => {
    return (
        <Formik
            onSubmit={(values) => sendMessage(values.message)}
            initialValues={{
                message: ""
            }}
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
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="say something"
                        name="message"
                        onChange={handleChange}
                        value={values.message}
                    />
                    <Button type="submit" onClick={() => handleSubmit()}>Send</Button>
                </InputGroup>
            )}
        </Formik>
    )
};

export default SendMessage;
