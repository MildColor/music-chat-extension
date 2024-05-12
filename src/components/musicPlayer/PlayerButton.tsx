import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";

interface PlayerButtonPropsType {
  children: React.ReactNode;
  onClick?: () => void;
}

const PLAYER_BUTTON_ATTRIBUTE = {
  size: "icon",
  variant: "ghost",
} as VariantProps<typeof buttonVariants>;

const PlayerButton = ({ children, onClick }: PlayerButtonPropsType) => {
  return (
    <Button {...PLAYER_BUTTON_ATTRIBUTE} onClick={onClick}>
      {children}
    </Button>
  );
};

export default PlayerButton;
