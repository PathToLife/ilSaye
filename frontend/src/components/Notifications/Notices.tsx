import React, {useContext} from "react";
import AppContext from "../../context/AppContext";
import Notice from "./Notice";

type noticesType = {
    setNotificationsHandler: any
}

const Notices: React.FC<noticesType> = ({setNotificationsHandler}) => {
    const context = useContext(AppContext);

    const removeNotice = (index: number) => {
        const notificationsCopy = [...context.notifications];
        notificationsCopy.splice(index, 1);
        setNotificationsHandler(notificationsCopy);
    };

    const noticesRender = () => {
        const noticeElems: any = [];
        context.notifications.forEach((notice, index) => {
            const {message, level} = notice;
            noticeElems.push(
                <Notice
                    key={index}
                    message={message}
                    level={level}
                    dismiss={() => removeNotice(index)}
                />
            )
        });
        return noticeElems;
    };

    return (
        <div>
            {noticesRender()}
        </div>
    )
};

export default Notices