import { CONNECTED_ID_KEY } from "@/constant/localStorage";
import { setLocalStorage } from "@/utils/localStorage";
import { useEffect, useState } from "react";

const useCheckTabState = () => {
  const [data, setData] = useState<messageData>({});

  useEffect(() => {
    const messageListener = (
      message: Message,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: unknown) => void
    ) => {
      switch (message.type) {
        case "checkTab":
          setLocalStorage(CONNECTED_ID_KEY, message.data.connectTab.id);
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

export default useCheckTabState;
