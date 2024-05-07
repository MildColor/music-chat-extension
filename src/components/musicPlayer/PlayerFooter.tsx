import React from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Pause, Play } from "lucide-react";

interface PlayerFooterPropsType {
  isPlaying: boolean;
}

const PlayerFooter = ({ isPlaying }: PlayerFooterPropsType) => {
  return (
    <CardFooter className="player-buttons flex items-center justify-center p-0">
      <Button size="icon" variant="ghost">
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </Button>
    </CardFooter>
  );
};

export default PlayerFooter;
