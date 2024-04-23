import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ModeToggle />
        
            
                  <img src="/logo.svg" alt="Notion logo" width={128} height={128} />
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Unleash Your Productivity
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Notion is a all-in-one workspace that combines your notes, tasks, wikis, and databases.
              </p>
            </div>
            <div className="space-x-4">
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <Image
            alt=""
            loading="eager"
            width="670"
            height="330"
            decoding="async"
            data-nimg="1"
            src="/notion-parade.webp"
          />
        </div>
      </section>
    </main>
  );
}
