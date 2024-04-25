import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  if (!auth().userId) {
    return redirect("/");
  }
  return <main>
    {children}</main>;
};
export default DashboardLayout;
