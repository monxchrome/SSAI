import { Avatar, AvatarImage } from "@/components/ui/avatar";

const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-0.3" src="/logo-next.png" />
    </Avatar>
  );
};

export default BotAvatar;
