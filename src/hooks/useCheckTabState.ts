import { useEffect, useState } from "react";

const useCheTabState = () => {
  const [data, setData] = useState<messageData>({});

  useEffect(() => {
    const messageListener = (
      message: Message,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: unknown) => void
    ) => {
      switch (message.type) {
        case "checkTab":
          setData({ ...message.data });
          sendResponse({ status: "received checkTab message" });
          console.log("checkTab message", message);
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

export default useCheTabState;