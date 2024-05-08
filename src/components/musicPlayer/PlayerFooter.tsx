import { CardFooter } from "../ui/card";
import { ChevronFirst, ChevronLast, Pause, Play } from "lucide-react";
import PlayerButton from "./PlayerButton";

interface PlayerFooterPropsType {
  isPlaying: boolean;
}

const PLAYER_BUTTON_SIZE = "h-5 w-5";

const PlayerFooter = ({ isPlaying }: PlayerFooterPropsType) => {
  const handleClickPlay = () => {
    console.log("handleClickPlay");
    chrome.runtime.sendMessage({ type: "togglePlayPause" });
  };

  return (
    <CardFooter className="player-buttons flex items-center justify-center p-0">
      <PlayerButton>
        <ChevronFirst className={PLAYER_BUTTON_SIZE} />
      </PlayerButton>
      <PlayerButton onClick={handleClickPlay}>
        {isPlaying ? (
          <Pause className={PLAYER_BUTTON_SIZE} />
        ) : (
          <Play className={PLAYER_BUTTON_SIZE} />
        )}
      </PlayerButton>
      <PlayerButton>
        <ChevronLast className={PLAYER_BUTTON_SIZE} />
      </PlayerButton>
    </CardFooter>
  );
};

export default PlayerFooter;
