import { useEffect, useState } from "react";

const useGetMusicInfo = () => {
  const [data, setData] = useState<messageData>({});

  useEffect(() => {
    const messageListener = (
      message: Message,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: unknown) => void
    ) => {
      switch (message.type) {
        case "updateMusicInfo":
          setData({ ...message.data });
          sendResponse({ status: "received updateMusicInfo message" });
          console.log("updateMusicInfo message", message);
          break;
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return {
    data,
    setData,
  };
};

export default useGetMusicInfo;
