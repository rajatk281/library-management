"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { auth } from '@/auth';
import { Session } from 'next-auth';
import { getInitials } from '@/lib/utils';

const Header = ({ session }: { session: Session }) => {

  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          Library
        </li>
        <li>
          <Link href='/my-profile'>
            <Avatar>
              <AvatarFallback className='text-black bg-blue-300 border-2 border-blue-600'>{getInitials(session?.user?.name || "")}</AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
