import React from 'react';
import ChatWallpaperImage from '../../../public/images/School-management-system-chat-wallpaper.png';

function ChatWallpaper() {
  return (
    <div className="chat-wallpaper-container">
      <img
        className="ChatWallpaper"
        src={ChatWallpaperImage}
        alt="ChatWallpaper"
      />
    </div>
  );
}

export default ChatWallpaper;
