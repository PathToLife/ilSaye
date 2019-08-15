import React from 'react';

type users = {
    count: number
};

const UsersOnline: React.FC<users> = ({count}) => {

    return (
        <div className={"UsersOnline"}>
            {`Sayers online: ${count} `}
        </div>
    )
};

export default UsersOnline;