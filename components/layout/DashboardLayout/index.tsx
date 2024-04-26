"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useUser } from "@clerk/clerk-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { Createpage, Menu } from "@/components/icon";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  const [menuHover, setMenuHover] = useState(false);
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
        defaultSize={20}
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
              <Button
                variant={"outline"}
                className="bg-transparent hover:bg-slate-300"
                size={"icon-sm"}
                onClick={() => setOpen(!open)}
              >
                <RxDoubleArrowLeft />
              </Button>
              {open && (
                <Button variant={"outline"} className="bg-transparent hover:bg-slate-300" size={"icon-sm"}>
                  <Createpage className="font-bold" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle onDragging={handleDragging} />
      <ResizablePanel className="overflow-auto h-screen">
        <nav className="flex p-2">
          {!open && (
            <Button
              variant={"outline"}
              className="bg-transparent hover:bg-slate-300"
              size={"icon-sm"}
              onClick={() => setOpen(!open)}
              onMouseEnter={() => setMenuHover(true)}
              onMouseLeave={() => setMenuHover(false)}
            >
              {menuHover ? <RxDoubleArrowRight /> : <Menu />}
            </Button>
          )}
        </nav>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default DashboardLayout;
