import { CardFooter } from "../ui/card";
import { ChevronFirst, ChevronLast, Pause, Play } from "lucide-react";
import PlayerButton from "./PlayerButton";
import { getLocalStorage } from "@/utils/localStorage";
import { CONNECTED_ID_KEY } from "@/constant/localStorage";

interface PlayerFooterPropsType {
  isPlaying: boolean;
}

const PLAYER_BUTTON_SIZE = "h-5 w-5";

const PlayerFooter = ({ isPlaying }: PlayerFooterPropsType) => {
  const connectedTabId = Number(getLocalStorage(CONNECTED_ID_KEY));

  const handleClickPlayToggle = () => {
    chrome.tabs.sendMessage(connectedTabId, {
      type: "togglePlayPause",
    });
  };

  const handleClickNextButton = () => {
    chrome.tabs.sendMessage(connectedTabId, {
      type: "playNext",
    });
  };

  const handleClickplayPreviousButton = () => {
    chrome.tabs.sendMessage(connectedTabId, {
      type: "playPrevious",
    });
  };

  return (
    <CardFooter className="player-buttons flex items-center justify-center p-0">
      <PlayerButton onClick={handleClickplayPreviousButton}>
        <ChevronFirst className={PLAYER_BUTTON_SIZE} />
      </PlayerButton>
      <PlayerButton onClick={handleClickPlayToggle}>
        {isPlaying ? (
          <Pause className={PLAYER_BUTTON_SIZE} />
        ) : (
          <Play className={PLAYER_BUTTON_SIZE} />
        )}
      </PlayerButton>
      <PlayerButton onClick={handleClickNextButton}>
        <ChevronLast className={PLAYER_BUTTON_SIZE} />
      </PlayerButton>
    </CardFooter>
  );
};

export default PlayerFooter;
