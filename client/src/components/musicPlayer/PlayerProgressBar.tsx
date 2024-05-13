import { Progress } from "@/components/ui/progress";

interface PlayerProgressBarPropsType {
  nowValue: number;
}

const PlayerProgressBar = ({ nowValue }: PlayerProgressBarPropsType) => {
  return <Progress className="h-1 my-3" value={nowValue} />;
};

export default PlayerProgressBar;
