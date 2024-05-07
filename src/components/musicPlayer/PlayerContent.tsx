import { CardContent } from "../ui/card";

interface PlayerContentPropsType {
  title: string;
  artist: string;
  duration: string;
  imageSrc: string;
}
const PlayerContent = ({
  title,
  artist,
  duration,
  imageSrc,
}: PlayerContentPropsType) => {
  return (
    <CardContent className="music-info flex flex-col items-center justify-center py-2 ">
      {imageSrc && <img src={imageSrc} className="py-1 w-16 h-16 rounded-md" />}
      <span className="py-0.5">{title}</span>
      <span className="py-0.5">{artist}</span>
      <span className="py-0.5">{duration}</span>
    </CardContent>
  );
};

export default PlayerContent;
