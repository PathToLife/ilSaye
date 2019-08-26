import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Formik} from "formik";
import React from "react";

type TCreateEvent = {
    createEvent: any
}

const CreateEvent:React.FC<TCreateEvent> = ({createEvent}) => {
    return (
        <Formik
            onSubmit={(values) => createEvent(values.eventName)}
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
                        placeholder="EventName"
                        name="eventName"
                        onChange={handleChange}
                        value={values.eventName}
                    />
                    <Button type="submit" onClick={() => handleSubmit()}>Create</Button>
                </InputGroup>
            )}
        </Formik>
    )
};

export default CreateEvent;
