import { ThemeProvider } from "./components/ui/theme-provider";
import HeaderMain from "./components/header/HeaderMain";
import LayoutMain from "./layouts/LayoutMain";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "./components/ui/button";
import useCheTabState from "./hooks/useCheckTabState";
import ChatRoom from "./components/chat/ChatRoom";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";
import { openYoutubeMusicTab } from "./utils/chrome";

const youtubeMusicUrl = "https://music.youtube.com";

function App() {
  const { data: tabState } = useCheTabState();

  const handleClickLink = () => {
    openYoutubeMusicTab();
  };

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LayoutMain>
          <HeaderMain />
          {tabState?.hasTab ? (
            <>
              <MusicPlayer />
              <ChatRoom />
            </>
          ) : (
            <div className="flex">
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
                  <Button onClick={handleClickLink} className="cursor-pointer">
                    Youtube
                  </Button>
                </div>
              </Alert>
            </div>
          )}
        </LayoutMain>
      </ThemeProvider>
    </>
  );
}
export default App;
