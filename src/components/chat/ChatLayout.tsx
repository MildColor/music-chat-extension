interface ChatLayoutProps {
  children?: React.ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="flex flex-1 pb-6 pt-0 overflow-y-auto">
      <div className="space-y-4 w-full h-auto overflow-y-auto box-border">
        {children}
      </div>
    </div>
  );
};

export default ChatLayout;
