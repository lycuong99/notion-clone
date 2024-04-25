"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { UserButton, UserProfile, useAuth, useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

import { RxDoubleArrowLeft } from "react-icons/rx";
import { Createpage } from "@/components/icon";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  const [collapsible, setCollapsible] = useState(true);
  const handleDragging = useCallback(() => {
    setCollapsible(!collapsible);
  }, [collapsible]);

  useLayoutEffect(() => {
    if (open) {
      sidebarPanelRef.current?.expand();
    } else {
      sidebarPanelRef.current?.collapse();
    }
  }, [open]);
  const sidebarPanelRef = useRef<ImperativePanelHandle>(null);

  const { user } = useUser();

  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen">
      <ResizablePanel
        ref={sidebarPanelRef}
        className=""
        defaultSize={25}
        collapsible={collapsible}
        maxSize={40}
        minSize={16}
      >
        <div className="flex flex-col p-2">
          <div className="flex justify-between hover:bg-accent hover:text-accent-foreground px-2 py-2 gap-2 rounded-md">
            <div className="flex items-center gap-1">
              <Avatar className="w-6 h-6">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
              <p>{user?.fullName}</p>
            </div>
            <div className="flex gap-1 ">
              <Button variant={"outline"} className="bg-transparent hover:bg-slate-300" size={"icon-sm"}>
                <RxDoubleArrowLeft />
              </Button>
              <Button variant={"outline"} className="bg-transparent hover:bg-slate-300" size={"icon-sm"}>
                <Createpage className="font-bold"  />
              </Button>
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle
        onDragging={handleDragging}
        onDragEnd={() => console.log("END")}
      />
      <ResizablePanel className="overflow-auto h-screen">
        <nav>
          <button onClick={() => setOpen(!open)}>toggle</button>
        </nav>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default DashboardLayout;
