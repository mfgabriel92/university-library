"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  session: Session;
}

const Header = ({ session }: HeaderProps) => {
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
            className={cn("cursor-pointer text-base text-white capitalize", {
              "text-light-200": pathname === "/library",
            })}
          >
            Library
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <Avatar>
              <AvatarFallback>
                {getInitials(session?.user?.name!)}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export { Header };
