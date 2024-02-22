import React from 'react';
import defaultAvatar from './blank-avatar-icon.jpg';

const TopBar = () => {
    const avatarSize = 64;
    return(
        <div className="top-bar">
            <img alt="profile picture"
                 src={defaultAvatar}
                 width={avatarSize}
                 height={avatarSize}/>
        </div>
    );
}

export default TopBar;
