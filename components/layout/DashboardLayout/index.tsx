"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { Createpage, Menu } from "@/components/icon";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
type animationConfig = {
  size: number;
};
gsap.registerPlugin(Flip, Draggable);
const config: animationConfig = { size: 0 };
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(true);
  const [menuHover, setMenuHover] = useState(false);
  const [collapsible, setCollapsible] = useState(true);
  const handleDragging = useCallback(() => {
    setCollapsible(!collapsible);
  }, [collapsible]);

  useLayoutEffect(() => {}, [isExpanded]);
  const sidebarPanelRef = useRef<ImperativePanelHandle>(null);
  const resizeHanleRef = useRef<HTMLDivElement>(null);

  const { user } = useUser();

  const startResizeRef = useRef<boolean>(false);



  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (sidebarRef.current && resizeHanleRef.current) {
      let newWidth =
        resizeHanleRef.current?.getBoundingClientRect().left +
        resizeHanleRef.current?.getBoundingClientRect().width;
      // resizeHanleRef.current.style.left = `${sidebarRef.current.offsetWidth}px`;
      if (newWidth > 100) {
        gsap.set(resizeHanleRef.current, {
          x: sidebarRef.current.clientWidth
        })
        // sidebarRef.current.style.width = `${newWidth}px`;
        
        console.log("newWidth ss", newWidth);
      }

    //   gsap.set(resizeHanleRef.current, {
    //       x:300,
    //       y:0
    //   })
     
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

  const handleExpand = () => {
    setExpanded(!isExpanded);
  };
  useLayoutEffect(() => {
    const classList = [
      "fixed",
      "z-10",
      "top-[80px]",
      "bg-white",
      "rounded-r-lg",
      "shadow-md",
    ];
    if (sidebarRef.current) {
      let state = Flip.getState([sidebarRef.current, contentRef.current]);
      // let contentState = Flip.getState(contentRef.current);
      if (!isExpanded) {
        sidebarRef.current.classList.add(...classList);
        sidebarRef.current.style.height = `calc(100vh - 160px)`;
        sidebarRef.current.style.transformOrigin = "top";
      } else {
        sidebarRef.current.classList.remove(...classList);
        sidebarRef.current.style.height = `100vh`;
      }
      Flip.from(state, {
        duration: 0.3,
        ease: "power1.out",
        // nested: true,
        scale: true,
        // absolute: true,
      });
    }
  }, [isExpanded]);
  const handleMousemove = useCallback(
    (e: MouseEvent) => {
      let condition = !isExpanded && !open;
      let mouseX = e.clientX;
      if(startResizeRef.current) return;
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
    document.addEventListener("mousemove", handleMousemove);
    return () => {
      document.removeEventListener("mousemove", handleMousemove);
    }
  }, [handleMousemove]);
  useLayoutEffect(() => {
      if(sidebarRef.current){
       gsap.to( sidebarRef.current,{
         x: open ? 0 : '-100%',
         delay: 0.2,
         duration: 0.3,
         opacity: open ? 1:0,
         ease: "power1.out",
       })
      }
  },[open])
  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={cn("w-[300px] bg-slate-100 z-10 origin-top border")}
        ref={sidebarRef}
      >
        <div className="flex  justify-between hover:bg-accent hover:text-accent-foreground px-2 py-2 gap-2 ">
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

        <div
          className="w-[4px] h-full hover:bg-gray-200 hover:cursor-col-resize top-0 fixed"
          data-gsap-resize-handle
          ref={resizeHanleRef}
        ></div>
      </div>

      <div className="flex-1 flex flex-col h-full origin-center-right" ref={contentRef}>
        <Header
          isExpanded={isExpanded}
          handleExpand={handleExpand}
        //   setMenuHover={setMenuHover}
        />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return <div>Sidebar</div>;
};
interface HeaderProps {
  isExpanded: boolean;
  handleExpand: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({ isExpanded, handleExpand }: HeaderProps) => {
    const [hover , setHover] = useState(false);
  return (
    <header>
      <nav className="flex p-2">
        {!isExpanded && (
          <Button
            variant={"outline"}
            className="bg-transparent hover:bg-slate-300"
            size={"icon-sm"}
            onClick={() => handleExpand(!isExpanded)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {hover ? <HiOutlineChevronDoubleRight /> : <Menu />}
          </Button>
        )}
      </nav>
    </header>
  );
};

export default DashboardLayout;
