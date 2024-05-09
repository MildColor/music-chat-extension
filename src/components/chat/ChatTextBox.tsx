import { getLocalStorage } from "@/utils/localStorage";
import { CONNECTED_ID_KEY } from "@/constant/localStorage";

type ChatTextBoxProps = ChatMessageType;

type userType = "me" | "other";

const getTypeClassName = (type: userType) => {
  const baseClass =
    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm text-wrap";

  switch (type) {
    case "other":
      return baseClass + " bg-muted";

    case "me":
      return baseClass + " ml-auto bg-primary text-primary-foreground";

    default:
      return baseClass;
  }
};

const ChatTextBox = ({ user, text }: ChatTextBoxProps) => {
  const nameId = getLocalStorage(CONNECTED_ID_KEY);

  const getUserType = (user: string) => {
    return nameId === user ? "me" : "other";
  };

  {
    const type = getUserType(user);

    return (
      <div
        className={`${getTypeClassName(type)}`}
        style={{ overflowWrap: "break-word" }}
      >
        {text}
      </div>
    );
  }
};

export default ChatTextBox;
