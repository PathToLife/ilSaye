import React from 'react';

type users = {
    count: number
};

const UsersOnline: React.FC<users> = ({count}) => {

    return (
        <div className={"UsersOnline"}>
            {`${count} Sayers online`}
        </div>
    )
};

export default UsersOnline;