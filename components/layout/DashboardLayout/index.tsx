"use client";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  const [collapsible, setCollapsible] = useState(true);
  const handleDragging = useCallback(() => {
    console.log('drag');
    
    setCollapsible(!collapsible);
    }, [collapsible]);
    useLayoutEffect(() => {
        const timeout = setTimeout(() => {
            
        });
    },[collapsible]);
    useLayoutEffect(() => {
      if (open) {
        sidebarPanelRef.current?.collapse();
      } else {
        sidebarPanelRef.current?.expand();
      }
    }, [open]);
  const sidebarPanelRef = useRef<ImperativePanelHandle>(null);
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        ref={sidebarPanelRef}
        className=""
        defaultSize={20}
        collapsible={collapsible}
        maxSize={40}
        minSize={10}
      >
        Sidebar
        <Button onClick={() => setOpen(!open)}>toggle</Button>
      </ResizablePanel>
      <ResizableHandle onDragging={handleDragging} onDragEnd={()=>console.log("END")}/>
      <ResizablePanel>
        <nav>
          <button onClick={() => setOpen(!open)}>toggle</button>
        </nav>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default DashboardLayout;
