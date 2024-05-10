import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ChatLayout from "./ChatLayout";
import ChatTextBox from "./ChatTextBox";
import useGetMusicInfo from "@/hooks/useGetMusicInfo";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { getLocalStorage } from "@/utils/localStorage";
import { CONNECTED_ID_KEY } from "@/constant/localStorage";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useScrollBottom from "@/hooks/useScrollBottom";
import { UsersRound } from "lucide-react";

const ENDPOINT = import.meta.env.VITE_BASE_URL;

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const ChatRoom = () => {
  const { data: musicInfo } = useGetMusicInfo();
  const { scrollToBottom, bottomRef } = useScrollBottom();

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    // 다른 방으로 join 되기전 연결되어 있는 socket이 있다면 disconnect
    if (socket) socket.disconnect();

    socket = io(ENDPOINT);

    const { title, artist } = musicInfo;
    if (!title || !artist) return;

    const nameId = getLocalStorage(CONNECTED_ID_KEY);
    const roomId = (title + " " + artist).trim();

    if (!nameId || !roomId) return;

    socket.emit("join", { name: nameId, room: roomId }, (error: unknown) => {
      if (error) {
        alert(error);
      }
    });
    // roomId가 바뀐경우에 다른 방으로 join 시켜야하기 때문에
    // roomId로 사용되는 artist, title만 dependency array에 적용
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicInfo.artist, musicInfo.title]);

  /* message 와 roomData listen */
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
      console.log("users: ", users);
    });

    // 이벤트 리스너 정리
    return () => {
      socket.off("message");
      socket.off("roomData");
    };
  }, [musicInfo.artist, musicInfo.title]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  const sendMessage = () => {
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
    scrollToBottom();
  };

  return (
    <>
      {musicInfo?.isVisibility && (
        <>
          <ChatLayout>
            <div className="flex justify-end items-center gap-1 absolute right-0 top-0 bg-background w-full p-1">
              {users.length}
              <UsersRound className="h-3 w-3" />
            </div>
            {messages.map((message) => {
              return (
                <>
                  <ChatTextBox {...message} />
                </>
              );
            })}
            <div ref={bottomRef}></div>
          </ChatLayout>
          <form
            className="flex w-full max-w-sm items-center space-x-2 my-3"
            onSubmit={(e) => handleOnSubmit(e)}
          >
            <Input
              type="text"
              name="message"
              placeholder="Chat with Others..."
              value={message}
              onChange={(e) => handleChangeInput(e)}
            />
            <Button type="submit">Send</Button>
          </form>
        </>
      )}
    </>
  );
};

export default ChatRoom;
