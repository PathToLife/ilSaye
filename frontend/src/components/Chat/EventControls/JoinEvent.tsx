import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Formik} from "formik";
import React from "react";

type TJoinEvent = {
    joinEvent: any
}

const JoinEvent:React.FC<TJoinEvent> = ({joinEvent}) => {
    return (
        <Formik
            onSubmit={(values) => joinEvent(values.eventName)}
            initialValues={{
                eventName: ""
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
                        placeholder="Event name"
                        aria-label="EventName"
                        aria-describedby="eventNameInput"
                        name="eventName"
                        onChange={handleChange}
                        value={values.eventName}
                    />
                    <Button type="submit" onClick={() => handleSubmit()}>Join</Button>
                </InputGroup>
            )}
        </Formik>
    )
};

export default JoinEvent;
