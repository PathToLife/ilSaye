import React, {useContext} from "react";
import AppContext from "../../context/AppContext";
import Notice from "./Notice";

type noticesType = {
    removeNotificationsHandler: (index:number) => void
}

const Notices: React.FC<noticesType> = ({removeNotificationsHandler}) => {
    const context = useContext(AppContext);

    const removeNotice = (index: number) => {
        removeNotificationsHandler(index);
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