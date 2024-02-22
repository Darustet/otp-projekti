import React from 'react';
import profileIcon from './blank-avatar-icon.jpg'

const TopBar = () => {
    const avatarSize = 64;
    return(
        <div className="top-bar">
            <img alt="profile picture"
                 src={profileIcon}
                 width={avatarSize}
                 height={avatarSize}/>
        </div>
    );
}

export default TopBar;
