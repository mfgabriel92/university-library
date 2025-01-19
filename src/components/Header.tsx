"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="container mx-auto my-10 flex justify-between gap-5">
      <Link href="/" className="text-white">
        <Image src="/logo.png" width={80} height={80} alt="Logo" />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn("cursor-pointer text-base capitalize text-white", {
              "text-light-200": pathname === "/library",
            })}
          >
            Library
          </Link>
        </li>
      </ul>
    </header>
  );
}
