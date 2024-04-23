import { auth } from "@clerk/nextjs/server";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const {userId} = auth();
  return (
    <>
      <header>
        <h1 className="text-3xl font-bold">Notion Clone {userId}</h1>
      </header>

      {children}
    </>
  );
};
export default MainLayout;
