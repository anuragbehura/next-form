import React from "react";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
// import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { MobileMenu } from "./MobileMenu";

export default async function Nav() {
  const user = await currentUser();

  return (
    // Updated: Cleaner border and background for Nav
    <nav className="w-full border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-[70px] px-6 sm:px-8">
        {/* Logo (Assuming this component is fine) */}
        <Logo />

        {/* Desktop Actions */}
        <div className="hidden sm:flex gap-4 items-center">
          {/* Add placeholder links for features/resources/pricing for completeness */}
          <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors text-sm font-medium">Features</Link>
          <Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors text-sm font-medium">Pricing</Link>

          <Separator orientation="vertical" className="h-5 mx-2 bg-gray-200 dark:bg-gray-700" />

          <ThemeSwitcher />

          {user ? (
            <UserButton afterSignOutUrl="/sign-in" />
          ) : (
            <SignInButton mode="modal">
              {/* Updated: Cleaner button style, less emphasis on the "Login/Signup" button to keep the focus on the main CTA */}
              <button
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold
                  transition-all duration-300 ease-in-out hover:bg-indigo-700"
              >
                Sign In
              </button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center gap-3">
          <ThemeSwitcher />
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}