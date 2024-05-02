// import { useState } from 'react'

import { ThemeProvider } from "./components/ui/theme-provider";
import ChatInputWithButton from "./components/chat/ChatInputWithButton";
import ChatLayout from "./components/chat/ChatLayout";
import HeaderMain from "./components/header/HeaderMain";
import LayoutMain from "./layouts/LayoutMain";
import { contentScriptStore } from "./store/contentScriptStore";

function App() {
  // const [count, setCount] = useState(0)

  const updateUrl = contentScriptStore((state) => state.updateUrl);

  const changeColorOnClick = async () => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      console.log("tab", tab.id);

      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => {
          document.body.style.backgroundColor = "green";
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LayoutMain>
          <HeaderMain />
          <ChatLayout />
          <ChatInputWithButton />
        </LayoutMain>
      </ThemeProvider>
    </>
  );
}
export default App;
