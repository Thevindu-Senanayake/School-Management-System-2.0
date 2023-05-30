import React, { Fragment, useState } from "react";
import Picker, { EmojiClickData } from "emoji-picker-react";

import getTime from "../../utils/timeUtilities";
import { HandleSendMsg } from "../../redux/types/reducerTypes";

const ChatInput = ({ handleSendMsg }: HandleSendMsg) => {
  const [input, setInput] = useState("");
  const [emojiPanelVisibility, setEmojiPanelVisibility] = useState(false);

  const toggleEmojiPanel = () => {
    setEmojiPanelVisibility(!emojiPanelVisibility);
  };

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    let message = input;
    message += emojiObject.emoji;
    setInput(message);
  };

  const sendChat = (event: React.FormEvent<HTMLFormElement>) => {
    const time = getTime();

    event.preventDefault();
    if (input.length > 0) {
      handleSendMsg(event, input, time);
      setInput("");
    }
  };

  return (
    <Fragment>
      <div className="chat-container">
        <div className="button-container">
          <div className="emoji">
            <img
              className="chat-insert-icon"
              src="../icons/attach-svgrepo-com.svg"
              alt="add file"
              onClick={toggleEmojiPanel}
            />
            {emojiPanelVisibility && <Picker onEmojiClick={handleEmojiClick} />}
          </div>
        </div>
        <form className="input-container" onSubmit={(e) => sendChat(e)}>
          <input
            type="text"
            placeholder="Type your message here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <img
              className="chat-send-icon"
              src="../icons/message-send-svgrepo-com.svg"
              alt="Send Icon"
            />
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ChatInput;
