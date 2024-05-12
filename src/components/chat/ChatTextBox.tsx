import { getLocalStorage } from "@/utils/localStorage";
import { CONNECTED_ID_KEY } from "@/constant/localStorage";

type ChatTextBoxProps = ChatMessageType;

type userType = "me" | "other";

const getPositionClass = (type: userType) => {
  const positionBaseClass = "flex w-max max-w-[75%] flex-col";

  switch (type) {
    case "other":
      return positionBaseClass;

    case "me":
      return positionBaseClass + " ml-auto";

    default:
      return "";
  }
};

const getTextBoxClass = (type: userType) => {
  const baseClass = "gap-2 rounded-lg px-3 py-2 text-sm text-wrap";
  const position = getPositionClass(type);

  switch (type) {
    case "other":
      return baseClass + position + " bg-muted";

    case "me":
      return baseClass + position + " bg-primary text-primary-foreground";

    default:
      return baseClass;
  }
};

const getNickNameClass = (type: userType) => {
  const baseClass = "py-1 text-xs leading-snug text-muted-foreground";
  const position = getPositionClass(type);

  return baseClass + " " + position;
};

const ChatTextBox = ({ user, text, nickname }: ChatTextBoxProps) => {
  const nameId = getLocalStorage(CONNECTED_ID_KEY);

  const getUserType = (user: string) => {
    return nameId === user ? "me" : "other";
  };

  {
    const type = getUserType(user);

    return (
      <div>
        <span className={`${getNickNameClass(type)}`}>{nickname}</span>
        <div
          className={`${getTextBoxClass(type)}`}
          style={{ overflowWrap: "break-word" }}
        >
          {text}
        </div>
      </div>
    );
  }
};

export default ChatTextBox;
