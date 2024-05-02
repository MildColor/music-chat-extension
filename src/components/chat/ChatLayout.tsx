import ChatTextBox from "./ChatTextBox";

const ChatLayout = () => {
  return (
    <div className="pb-6 pt-0">
      <div className="space-y-4 w-auto h-96 overflow-auto">
        <ChatTextBox type="me" text="hi" />
      </div>
    </div>
  );
};

export default ChatLayout;
