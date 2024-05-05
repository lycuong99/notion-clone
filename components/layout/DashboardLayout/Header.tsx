import { Menu } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MouseEventHandler, useState } from "react";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

interface HeaderProps {
    isExpanded: boolean;
    onMenuClick: MouseEventHandler<HTMLButtonElement>;
  }
  const Header = ({ isExpanded, onMenuClick }: HeaderProps) => {
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
              onClick={onMenuClick}
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
  export { Header }