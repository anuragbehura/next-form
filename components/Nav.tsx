import React from "react";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";

async function Nav() {
  const user = await currentUser();

  return (
    <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
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
        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <SignInButton mode="modal">
            <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors">
              Login
              <ArrowRight size={16} />
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}

export default Nav;
