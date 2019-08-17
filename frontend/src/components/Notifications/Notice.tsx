import React, {} from "react";
import classes from "./Notices.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import cx from "classnames";

export enum NoticeLevel {
    Good,
    Neutral,
    Warning,
    Bad
}

// For rest of application for setting and storing notices
export type NoticeType = {
    message: string,
    level: NoticeLevel
}

// For the Notice render to implement
type noticeComponent = {
    dismiss: any
} & NoticeType;

const Notice: React.FC<noticeComponent> = ({message, dismiss, level}) => {

    const levelStyling = ((color) => {
        switch (color) {
            case NoticeLevel.Good:
                return classes.green;
            case NoticeLevel.Neutral :
                return classes.blue;
            case NoticeLevel.Warning :
                return classes.orange;
            case NoticeLevel.Bad :
                return classes.red;
            default:
                return classes.grey;
        }
    })(level);

    return (
        <Row className={cx(levelStyling, classes.Notice)}>
            <Col>
                <div className={cx(classes.noticeText, "float-right")}>
                    {message}
                </div>
            </Col>
            <Col>
                <button onClick={dismiss} className={cx(classes.dismissButton, "float-left")}>
                    <i className="fas fa-times"/>
                </button>
            </Col>
        </Row>
    )
};

export default Notice;