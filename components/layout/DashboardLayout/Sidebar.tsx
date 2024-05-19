import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useUser, useAuth } from "@clerk/clerk-react";

import { AnglesLeft, Createpage, Search } from "@/components/icon";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { UserProfile } from "./UserProfile";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { getAuthToken } from "@/app/auth";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { SearchIcon } from "lucide-react";
interface SidebarProps {
  isExpanded: boolean;
  handleExpand: Function;
}
const Sidebar = ({ isExpanded, handleExpand }: SidebarProps) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [hover, setHover] = useState(false);

  const { isMobile } = useMediaQuery();
  const isShowOpenSidebarButton = isExpanded && !isMobile && hover;

  const createDocument = useMutation(api.documents.create);
  const handleCreateDocument = async () => {
    // const token = await getToken();
    // console.log(token);

    // await fetchMutation(api.documents.create, { title: "Untitled" }, {
    //   token: token?.toString()
    // });
    await createDocument({ title: "Untitled" });
    toast("Document created");
  };
  const documents = useQuery(api.documents.get);

  return (
    <div
      className="flex flex-col gap-2 px-2 py-2 h-full items-stretch"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="hover:bg-slate-200  hover:cursor-pointer p-1 flex rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <UserProfile className="flex-1" />
        <div className="flex gap-1 ">
          {isShowOpenSidebarButton && (
            <Button
              variant={"ghost"}
              className={cn(
                "bg-transparent hover:bg-slate-300 hover:opacity-100",
                {
                  "opacity-50": hover,
                }
              )}
              size={"icon-sm"}
              onClick={() => handleExpand()}
            >
              <AnglesLeft className="font-bold" />
            </Button>
          )}
          <Button
            variant={"ghost"}
            className="bg-transparent hover:bg-slate-300"
            size={"icon-sm"}
            onClick={handleCreateDocument}
          >
            <Createpage className="font-bold w-full h-full" />
          </Button>
        </div>
      </div>
      <Command className="flex-1">
        <CommandList className="flex-1">
          <CommandItem>
            <SearchIcon className="mr-2 h-4 w-4" />
            Search
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
          <CommandGroup heading="Documents">
            {documents?.map((document) => (
              <CommandItem key={document._id}>{document.title}</CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export { Sidebar };
