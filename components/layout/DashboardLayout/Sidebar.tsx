import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useUser } from "@clerk/clerk-react";

import { Createpage } from "@/components/icon";
import { RxDoubleArrowLeft } from "react-icons/rx";

interface SidebarProps {
  isExpanded: boolean;
  handleExpand: Function;
}
const Sidebar = ({ isExpanded, handleExpand }: SidebarProps) => {
  const { user } = useUser();

  const { isMobile } = useMediaQuery();
  const isShowOpenSidebarButton = isExpanded && !isMobile;

  return (
    <div className="flex justify-between hover:bg-accent hover:text-accent-foreground px-2 py-2 gap-2 ">
      <div className="flex items-center gap-1">
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.imageUrl} />
        </Avatar>
        <p>{user?.fullName}</p>
      </div>
      <div className="flex gap-1 ">
        {isShowOpenSidebarButton && (
          <Button
            variant={"outline"}
            className="bg-transparent hover:bg-slate-300"
            size={"icon-sm"}
            onClick={() => handleExpand()}
          >
            <RxDoubleArrowLeft />
          </Button>
        )}
        <Button
          variant={"outline"}
          className="bg-transparent hover:bg-slate-300"
          size={"icon-sm"}
        >
          <Createpage className="font-bold" />
        </Button>
      </div>
    </div>
  );
};

export { Sidebar }