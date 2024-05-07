import { ThemeProvider } from "./components/ui/theme-provider";
import ChatInputWithButton from "./components/chat/ChatInputWithButton";
import ChatLayout from "./components/chat/ChatLayout";
import HeaderMain from "./components/header/HeaderMain";
import LayoutMain from "./layouts/LayoutMain";
import ChatTextBox from "./components/chat/ChatTextBox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "./components/ui/button";
import useCheTabState from "./hooks/useCheckTabState";

const youtubeMusicUrl = "https://music.youtube.com";

function App() {
  const { data } = useCheTabState();

  const handleClickLink = () => {
    chrome.windows.getAll({ windowTypes: ["normal"] }, (windows) => {
      if (windows.length > 0) {
        // 첫 번째 'normal' 타입의 창에 새 탭을 추가
        chrome.tabs.create(
          { windowId: windows[0].id, url: youtubeMusicUrl },
          (newTab) => {
            console.log("New tab opened in an existing window:", newTab);
          }
        );
      } else {
        // 적절한 창이 없다면 새 창을 생성
        chrome.windows.create({ url: youtubeMusicUrl });
      }
    });
  };

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LayoutMain>
          <HeaderMain />
          <ChatLayout>
            {data?.hasTab ? (
              <>
                <ChatTextBox type="me" text="hi" />
              </>
            ) : (
              <div className="flex h-full justify-center items-center">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Available on YouTube Music</AlertTitle>
                  <AlertDescription>
                    This extension operates only on YouTube Music.
                    <br />
                    Please navigate to YouTube Music now to utilize this
                    extension’s features!
                  </AlertDescription>
                  <div className="flex items-center justify-center w-full p-5">
                    <Button
                      onClick={handleClickLink}
                      className="cursor-pointer"
                    >
                      Youtube
                    </Button>
                  </div>
                </Alert>
              </div>
            )}
          </ChatLayout>

          {data?.hasTab && <ChatInputWithButton />}
        </LayoutMain>
      </ThemeProvider>
    </>
  );
}
export default App;
