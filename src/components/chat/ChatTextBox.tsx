type ChatTextBoxProps = {
  type: userType;
  text?: string;
};

type userType = "me" | "other";

const getTypeClassName = (type: userType) => {
  const baseClass =
    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm";

  switch (type) {
    case "me":
      return baseClass + " bg-muted";

    case "other":
      return baseClass + " ml-auto bg-primary text-primary-foreground";
  }
};

const ChatTextBox = ({ type, text }: ChatTextBoxProps) => {
  return <div className={`${getTypeClassName(type)}`}>{text}</div>;
};

export default ChatTextBox;
