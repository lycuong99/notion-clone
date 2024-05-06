"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(Flip, Draggable);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(true);

  const resizeHanleRef = useRef<HTMLDivElement>(null);
  const startResizeRef = useRef<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { isMobile } = useMediaQuery();
  const handleExpand = () => {
    setExpanded(!isExpanded);
  };

  useGSAP(() => {
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
        if (sidebarRef.current && resizeHanleRef.current) {
          let newWidth = resizeHanleRef.current?.getBoundingClientRect().left + resizeHanleRef.current?.offsetWidth;

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
  });

  useLayoutEffect(() => {
    // setExpanded(true);
    console.log("SET EXPANDED TO TRUE");

    if (isMobile) {
      gsap.set(sidebarRef.current, {
        position: "absolute",
        top: 0,
      });
      gsap.set(sidebarRef.current, {
        x: 0,
        opacity: 1,
      });
    } else {
      gsap.set(sidebarRef.current, {
        clearProps: "position,top,opacity,x",
      });
      gsap.set(contentRef.current, {
        clearProps: "transform",
      });
      // setExpanded(false);
      setOpen(true);
    }

    // return () => {
    //   gsap.set(sidebarRef.current, {
    //     clearProps: "all",
    //   });
    //   gsap.set(contentRef.current, {
    //     clearProps: "all",
    //   });
    //   setOpen(true);
    //   setExpanded(true);
    // };
  }, [isMobile]);

  useGSAP(() => {
    if (sidebarRef.current) {
      let state = Flip.getState([sidebarRef.current, contentRef.current]);
      const classList = ["md:fixed", "z-10", "top-[80px]", "bg-white", "rounded-r-lg", "shadow-md"];

      const clearExpand = () => {
        if (!sidebarRef.current) return;
        sidebarRef.current.classList.remove(...classList);
        sidebarRef.current.style.height = `100vh`;
      };
      const expand = () => {
        if (!sidebarRef.current) return;
        if (!isExpanded) {
          sidebarRef.current.classList.add(...classList);
          sidebarRef.current.style.height = `calc(100vh - 160px)`;
        } else {
          clearExpand();
        }
      };

      console.log("Expanded - ", isExpanded);
      if (isMobile) {
        clearExpand();
      } else {
        expand();
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
    // if (isMobile) return;
    document.addEventListener("mousemove", handleMousemove);
    return () => {
      document.removeEventListener("mousemove", handleMousemove);
    };
  }, [handleMousemove]);

  useGSAP(
    () => {
      if (sidebarRef.current) {
        console.log("Open - ", open);

        if (isMobile) {
          gsap.to(contentRef.current, {
            x: open ? sidebarRef.current.clientWidth : 0,
            delay: 0.2,
            duration: 0.3,
            ease: "power1.out",
          });
        } else {
          gsap.set(contentRef.current, {
            x: 0,
          });
          gsap.to(sidebarRef.current, {
            x: open ? 0 : "-100%",
            delay: 0.2,
            duration: 0.3,
            opacity: open ? 1 : 0,
            ease: "power1.out",
          });
        }
      }
    },
    {
      dependencies: [open, isMobile],
      // revertOnUpdate: true,
    }
  );

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="flex h-screen overflow-hidden relative">
      <div className={cn("w-[300px] bg-slate-100 h-full z-10 md:z-20 origin-top border")} ref={sidebarRef}>
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
        className={cn("w-full md:flex-1 flex flex-col h-full origin-center-right z-20 md:z-10 bg-white")}
        ref={contentRef}
      >
        <Header
          isExpanded={isExpanded}
          onMenuClick={() => {
            if (isMobile) handleOpen();
            else handleExpand();
          }}
        />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
