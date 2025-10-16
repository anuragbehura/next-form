import React from "react";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Github} from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { MobileMenu } from "./MobileMenu";

export default async function Nav() {
  const user = await currentUser();

  return (
    <nav className="w-full border-b border-border bg-background">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-[60px] px-4 sm:px-6 md:px-8 lg:px-20">
        {/* Logo */}
        <Logo />

        {/* Desktop Actions */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link
            href="https://github.com/anuragbehura"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            <Github size={18} />
          </Link>

          <ThemeSwitcher />

          {!user && <Separator orientation="vertical" className="h-6 mx-2" />}

          {user ? (
            <UserButton afterSignOutUrl="/sign-in" />
          ) : (
            <SignInButton mode="modal">
              <button
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm 
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

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center gap-3">
          <ThemeSwitcher />
          <MobileMenu user={user} />
        </div>
      </div>
    </nav>
  );
}

