import React from "react";
import ChatLayout from "./ChatLayout";
import ChatTextBox from "./ChatTextBox";
import ChatInputWithButton from "./ChatInputWithButton";

const ChatRoom = () => {
  return (
    <ChatLayout>
      <ChatTextBox type="me" text="hi" />
      <ChatInputWithButton />
    </ChatLayout>
  );
};

export default ChatRoom;
