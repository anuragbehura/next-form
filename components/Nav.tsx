import React from "react";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";

async function Nav() {
  const user = await currentUser();

  return (
    <nav className="flex justify-between items-center border-b border-border h-[60px] lg:px-20 md:px-4 sm:px-4 py-2">
      <Logo />
      <div className="flex gap-2 items-center cursor-pointer">
        <Link
          href="https://github.com/anuragbehura"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600"
        >
          <Github size={16} />
        </Link>
        <ThemeSwitcher />

        {!user && <Separator orientation="vertical" className="h-6 mx-2" />}

        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <SignInButton mode="modal">
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-primary-foreground rounded-md text-sm 
               transition-all duration-300 ease-in-out group relative pr-8"
            >
              Login/Signup
              <ArrowRight
                size={16}
                className="absolute right-4 transition-all duration-300 ease-in-out 
                group-hover:translate-x-1"
              />
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}

export default Nav;
