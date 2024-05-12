import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import PlayerFooter from "./PlayerFooter";
import useGetMusicInfo from "@/hooks/useGetMusicInfo";
import PlayerContent from "./PlayerContent";

const MusicPlayer = () => {
  const { data: musicInfo } = useGetMusicInfo();
  return (
    <>
      <Card className="music-player felx flex-col items-center justify-center">
        {musicInfo?.isVisibility && (
          <>
            <PlayerContent {...musicInfo} />
            <PlayerFooter isPlaying={musicInfo.isPlaying} />
          </>
        )}

        {!musicInfo?.isVisibility && (
          <>
            <CardHeader>
              <CardTitle>Play the song!</CardTitle>
              <CardDescription>
                When you play a song, you will automatically access the chat
                room! Share your impressions with others!
              </CardDescription>
            </CardHeader>
          </>
        )}
      </Card>
    </>
  );
};

export default MusicPlayer;
