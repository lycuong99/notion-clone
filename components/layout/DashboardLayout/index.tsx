"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useUser } from "@clerk/clerk-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { Createpage, Menu } from "@/components/icon";
import { cn } from "@/lib/utils";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(false);
  const [menuHover, setMenuHover] = useState(false);
  const [collapsible, setCollapsible] = useState(true);
  const handleDragging = useCallback(() => {
    setCollapsible(!collapsible);
  }, [collapsible]);

  useLayoutEffect(() => {
    if (isExpanded) {
      sidebarPanelRef.current?.expand();
    } else {
      sidebarPanelRef.current?.collapse();
    }
  }, [isExpanded]);
  const sidebarPanelRef = useRef<ImperativePanelHandle>(null);

  const { user } = useUser();

  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen">
      <ResizablePanel
        ref={sidebarPanelRef}
        className=""
        defaultSize={20}
        collapsible={collapsible}
        maxSize={40}
        minSize={16}
      >
        <div
          className={cn("flex flex-col p-2", {
            "fixed h-[90vh] rounded-lg w-[20vw] translate-y-[5vh] transition-transform duration-300 shadow-xl rounded-r-md":
              !isExpanded,
          })}
        >
          <div className="flex justify-between hover:bg-accent hover:text-accent-foreground px-2 py-2 gap-2 ">
            <div className="flex items-center gap-1">
              <Avatar className="w-6 h-6">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
              <p>{user?.fullName}</p>
            </div>
            <div className="flex gap-1 ">
              {isExpanded && (
                <Button
                  variant={"outline"}
                  className="bg-transparent hover:bg-slate-300"
                  size={"icon-sm"}
                  onClick={() => setExpanded(!isExpanded)}
                >
                  <RxDoubleArrowLeft />
                </Button>
              )}
              <Button variant={"outline"} className="bg-transparent hover:bg-slate-300" size={"icon-sm"}>
                <Createpage className="font-bold" />
              </Button>
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle onDragging={handleDragging} />
      <ResizablePanel className="overflow-auto h-screen">
        <nav className="flex p-2">
          {!isExpanded && (
            <Button
              variant={"outline"}
              className="bg-transparent hover:bg-slate-300"
              size={"icon-sm"}
              onClick={() => setExpanded(!isExpanded)}
              onMouseEnter={() => setMenuHover(true)}
              onMouseLeave={() => setMenuHover(false)}
            >
              {isExpanded ? <RxDoubleArrowRight /> : <Menu />}
            </Button>
          )}
        </nav>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default DashboardLayout;
