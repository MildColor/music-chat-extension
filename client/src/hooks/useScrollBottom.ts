import { useRef } from "react";

const useScrollBottom = () => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return { scrollToBottom, bottomRef };
};

export default useScrollBottom;
