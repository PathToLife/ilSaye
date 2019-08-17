import React, {useContext} from "react";
import AppContext from "../../context/AppContext";
import Notice from "./Notice";

const Notices: React.FC = () => {
    const context = useContext(AppContext);

    const removeNotice = (index: number) => {
        const notificationsCopy = [...context.notifications];
        notificationsCopy.splice(index, 1);
        context.setNotifications(notificationsCopy);
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