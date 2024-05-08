import React from "react";
import ChatLayout from "./ChatLayout";
import ChatTextBox from "./ChatTextBox";
import ChatInputWithButton from "./ChatInputWithButton";
import useGetMusicInfo from "@/hooks/useGetMusicInfo";

const ChatRoom = () => {
  const { data: musicInfo } = useGetMusicInfo();

  return (
    <>
      {musicInfo?.isVisibility && (
        <>
          <ChatLayout>
            <ChatTextBox type="me" text="hi" />
            <ChatInputWithButton />
          </ChatLayout>
        </>
      )}
    </>
  );
};

export default ChatRoom;
