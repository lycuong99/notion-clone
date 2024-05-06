import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useUser } from "@clerk/clerk-react";

import { Createpage } from "@/components/icon";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { UserProfile } from "./UserProfile";

interface SidebarProps {
  isExpanded: boolean;
  handleExpand: Function;
}
const Sidebar = ({ isExpanded, handleExpand }: SidebarProps) => {
  const { user } = useUser();

  const { isMobile } = useMediaQuery();
  const isShowOpenSidebarButton = isExpanded && !isMobile;

  return (
    <div className="flex flex-col gap-2 px-2 py-2 items-stretch">
      <div className="hover:bg-slate-200 hover:cursor-pointer p-1 flex round-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <UserProfile className="flex-1" />
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
    </div>
  );
};

export { Sidebar };
