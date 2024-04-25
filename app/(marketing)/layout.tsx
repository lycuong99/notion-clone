import MainLayout from "@/components/layout/MainLayout";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};
export default CommonLayout;
