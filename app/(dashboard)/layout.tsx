import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Layout from "@/components/layout/DashboardLayout";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  if (!auth().userId) {
    return redirect("/");
  }
  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
};

export default DashboardLayout;
