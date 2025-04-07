/* eslint-disable @next/next/no-img-element */
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

interface iAppProps {
    userImage: string | null;
}

export function UserDropdown({ userImage }: iAppProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
                    <img 
                        src={
                            userImage ||
                            "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                        } 
                        alt="user avatar" 
                        className="rounded-full w-8 h-8 hidden lg:block"
                    />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href="/r/create" className="w-full">
                        Create Community
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/create" className="w-full">
                        Create Post
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/settings" className="w-full">
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogoutLink className="w-full">Logout</LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}