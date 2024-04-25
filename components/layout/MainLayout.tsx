import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useAuth, useClerk } from "@clerk/nextjs";
import { User, auth } from "@clerk/nextjs/server";
import { useConvexAuth } from "convex/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  // const {} = useAuth();
  // const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <>
      <header className="flex justify-between py-2  px-4 md:px-6">
        <Logo />

        <div className="flex items-center gap-2">
          {/* {
            isLoading ?  (
              <div className="w-10 h-10 animate-pulse rounded-full bg-gray-300"></div>
            ) : (
              isAuthenticated? (
                <UserButton />
              ) : (
                <SignInButton mode="modal">
                  <Button size={"sm"}>Sign in</Button>
                </SignInButton>
              )
            )
          } */}
          {userId ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <Button size={"sm"}>Sign in</Button>
            </SignInButton>
          )}
          <ModeToggle />
        </div>
      </header>

      {children}
    </>
  );
};
export default MainLayout;
