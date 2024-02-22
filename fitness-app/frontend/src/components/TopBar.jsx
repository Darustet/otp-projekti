import React from 'react';

const TopBar = () => {
    const avatarSize = 64;
    return(
        <div className="top-bar">
            <img alt="profile picture"
                 src={'./blank-avatar-icon.jpg'}
                 width={avatarSize}
                 height={avatarSize}/>
        </div>
    );
}

export default TopBar;
