import ChatTextBox from "./ChatTextBox";

interface ChatLayoutProps {
  children?: React.ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="pb-6 pt-0">
      <div className="space-y-4 w-auto h-96 overflow-auto">{children}</div>
    </div>
  );
};

export default ChatLayout;
