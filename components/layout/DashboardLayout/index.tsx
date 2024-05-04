"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

import { RxDoubleArrowLeft } from "react-icons/rx";
import { Createpage, Menu } from "@/components/icon";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(Flip, Draggable);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(true);
  const [menuHover, setMenuHover] = useState(false);
  const [collapsible, setCollapsible] = useState(true);
  const handleDragging = useCallback(() => {
    setCollapsible(!collapsible);
  }, [collapsible]);

  useLayoutEffect(() => {
    if (sidebarRef.current && resizeHanleRef.current) {
        gsap.set(resizeHanleRef.current, {
          x: sidebarRef.current.clientWidth,
        });
      }
      Draggable.create("[data-gsap-resize-handle]", {
        type: "x",
        cursor: "col-resize",
        activeCursor: "col-resize",
        bounds: { minX: 200, maxX: 500 },
        onDrag: () => {
          console.log("newWidth");
          if (sidebarRef.current && resizeHanleRef.current) {
            let newWidth =
              resizeHanleRef.current?.getBoundingClientRect().left +
              resizeHanleRef.current?.offsetWidth;
            console.log("newWidth xx", newWidth);
    
            sidebarRef.current.style.width = `${newWidth}px`;
          }
        },
        onDragStart: () => {
          startResizeRef.current = true;
        },
        onDragEnd: () => {
          startResizeRef.current = false;
        },
    
        liveSnap: {
          x: function (value) {
            //snap to the closest increment of 50.
            return Math.round(value / 10) * 10;
          },
        },
        inertia: true,
      });
  }, []);

  const resizeHanleRef = useRef<HTMLDivElement>(null);


  const startResizeRef = useRef<boolean>(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  
  const contentRef = useRef<HTMLDivElement>(null);

  const { isMobile } = useMediaQuery();

  useLayoutEffect(() => {
    if (!isMobile) {
      if (sidebarRef.current && resizeHanleRef.current) {
        gsap.set(resizeHanleRef.current, {
          x: sidebarRef.current.clientWidth,
        });
      }
      Draggable.create("[data-gsap-resize-handle]", {
        type: "x",
        cursor: "col-resize",
        activeCursor: "col-resize",
        bounds: { minX: 200, maxX: 500 },
        onDrag: () => {
          console.log("newWidth");
          if (sidebarRef.current && resizeHanleRef.current) {
            let newWidth =
              resizeHanleRef.current?.getBoundingClientRect().left +
              resizeHanleRef.current?.offsetWidth;
            console.log("newWidth xx", newWidth);

            sidebarRef.current.style.width = `${newWidth}px`;
          }
        },
        onDragStart: () => {
          startResizeRef.current = true;
        },
        onDragEnd: () => {
          startResizeRef.current = false;
        },

        liveSnap: {
          x: function (value) {
            //snap to the closest increment of 50.
            return Math.round(value / 10) * 10;
          },
        },
        inertia: true,
      });
    }
  }, [isMobile]);

  const handleExpand = () => {
    setExpanded(!isExpanded);
  };

  useLayoutEffect(() => {
   
    if (sidebarRef.current) {
      let state = Flip.getState([sidebarRef.current, contentRef.current]);
      // let contentState = Flip.getState(contentRef.current);
      
      const handleExpand = () => {
        const classList = [
            "fixed",
            "z-10",
            "top-[80px]",
            "bg-white",
            "rounded-r-lg",
            "shadow-md",
          ];
        if(!sidebarRef.current) return;
        if (!isExpanded) {
            sidebarRef.current.classList.add(...classList);
            sidebarRef.current.style.height = `calc(100vh - 160px)`;
          } else {
            sidebarRef.current.classList.remove(...classList);
            sidebarRef.current.style.height = `100vh`;
          }
      }
      const handleExpandOnMobile = () => {
        if(!sidebarRef.current) return;
        // const classList = [
        //     "-translate-x-full",
        // ]
        if (!isExpanded) {
            // sidebarRef.current.classList.add(...classList);
            gsap.set(sidebarRef.current, {
              translateX: "-100%",
            })
          } else {
            gsap.set(sidebarRef.current, {
                translateX: "-100%",
              })
          }
      }

      if(isMobile){
        handleExpandOnMobile();
      }
      else {
        handleExpand();
      }

      Flip.from(state, {
        duration: 0.3,
        ease: "power1.out",
        // nested: true,
        scale: true,
        // absolute: true,
      });
    }
  }, [isExpanded, isMobile]);
  const handleMousemove = useCallback(
    (e: MouseEvent) => {
        
      let condition = !isExpanded && !open;
      let mouseX = e.clientX;
      if (startResizeRef.current) return;
      if (sidebarRef.current) {
        let sidebarWidth = sidebarRef.current?.offsetWidth;
        if (condition) {
          if (mouseX < sidebarWidth * 0.5) {
            setOpen(true);
          }
        } else if (!isExpanded && open) {
          if (mouseX > sidebarWidth + 10) {
            setOpen(false);
          }
        }
      }
    },
    [isExpanded, open]
  );

  useLayoutEffect(() => {
    if(isMobile) return;
    document.addEventListener("mousemove", handleMousemove);
    return () => {
      document.removeEventListener("mousemove", handleMousemove);
    };
  }, [handleMousemove, isMobile]);

  useLayoutEffect(() => {
    if (sidebarRef.current) {
        if(isMobile){
           gsap.to(contentRef.current, {
            x: open ? -sidebarRef.current?.offsetWidth : 0,
           
           });
        //    gsap.to(sidebarRef.current, {
        //        x: 
        //    })
        }else{
            // gsap.to(sidebarRef.current, {
            //     x: open ? 0 : "-100%",
            //     delay: 0.2,
            //     duration: 0.3,
            //     opacity: open ? 1 : 0,
            //     ease: "power1.out",
            //   });
        }
       
    }
  }, [open, isMobile]);

  const handleOpen = () => {
    setOpen(!open);
  }
  return (
    <div className="flex h-screen overflow-hidden relative">
      <div
        className={cn("w-[300px] bg-slate-100 z-10 origin-top border z-0")}
        ref={sidebarRef}
      >
        <Sidebar isExpanded={isExpanded} handleExpand={handleExpand} />

        {!isMobile && (
          <div
            className="w-[4px] h-full hover:bg-gray-200 hover:cursor-col-resize top-0 fixed z-10 lg:z-0"
            data-gsap-resize-handle
            ref={resizeHanleRef}
          ></div>
        )}
      </div>

      <div
        className="flex-1 flex flex-col h-full origin-center-right z-20"
        ref={contentRef}
      >
        <Header
          isExpanded={isExpanded}
          handleExpand={handleExpand}
          handleOpenSidebar={handleOpen}
          //   setMenuHover={setMenuHover}
        />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};
interface SidebarProps {
  isExpanded: boolean;
  handleExpand: Function;
}
const Sidebar = ({ isExpanded, handleExpand }: SidebarProps) => {
  const { user } = useUser();

  const {isMobile} = useMediaQuery();
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
interface HeaderProps {
  isExpanded: boolean;
  handleExpand: Function;
  handleOpenSidebar: Function;
}
const Header = ({ isExpanded, handleExpand, handleOpenSidebar }: HeaderProps) => {
  const [hover, setHover] = useState(false);
  const {isMobile} = useMediaQuery();

  return (
    <header>
      <nav className="flex p-2">
        {(!isExpanded || isMobile) && (
          <Button
            variant={"outline"}
            className="bg-transparent hover:bg-slate-300"
            size={"icon-sm"}
            onClick={() => {
                if(isMobile) handleOpenSidebar();
                else handleExpand();
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {hover && !isMobile ? <HiOutlineChevronDoubleRight /> : <Menu />}
          </Button>
        )}
      </nav>
    </header>
  );
};

export default DashboardLayout;
