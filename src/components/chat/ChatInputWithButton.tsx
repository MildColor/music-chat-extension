import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const ChatInputWithButton = () => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Chat with Others..." />
      <Button type="submit">Send</Button>
    </div>
  );
};

export default ChatInputWithButton;
