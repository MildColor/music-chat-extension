import { Card } from "../ui/card";
import PlayerFooter from "./PlayerFooter";
import useGetMusicInfo from "@/hooks/useGetMusicInfo";
import PlayerContent from "./PlayerContent";

const MusicPlayer = () => {
  const { data: musicInfo } = useGetMusicInfo();
  return (
    <>
      {musicInfo?.isVisibility && (
        <Card className="music-player felx flex-col items-center justify-center mb-4">
          <PlayerContent {...musicInfo} />
          <PlayerFooter isPlaying={musicInfo.isPlaying} />
        </Card>
      )}
    </>
  );
};

export default MusicPlayer;
