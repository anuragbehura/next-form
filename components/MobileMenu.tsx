"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { ArrowRight, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { UserResource } from "@clerk/types";

export function MobileMenu({ user }: { user: UserResource | null }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-md hover:bg-muted transition"
        aria-label="Toggle menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-popover shadow-lg rounded-lg border border-border p-3 flex flex-col gap-3 z-50">
          <Link
            href="https://github.com/anuragbehura"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-gray-700 transition"
          >
            <Github size={16} />
            GitHub
          </Link>

          {!user ? (
            <SignInButton mode="modal">
              <button className="flex justify-between items-center w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm transition hover:bg-blue-700">
                Login/Signup
                <ArrowRight size={14} />
              </button>
            </SignInButton>
          ) : (
            <UserButton afterSignOutUrl="/sign-in" />
          )}
        </div>
      )}
    </div>
  );
}
