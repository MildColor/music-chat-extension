import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";

interface PlayerButtonPropsType {
  children: React.ReactNode;
}

const PLAYER_BUTTON_ATTRIBUTE = {
  size: "icon",
  variant: "ghost",
} as VariantProps<typeof buttonVariants>;

const PlayerButton = ({ children }: PlayerButtonPropsType) => {
  return <Button {...PLAYER_BUTTON_ATTRIBUTE}>{children}</Button>;
};

export default PlayerButton;
