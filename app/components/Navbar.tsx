import Link from "next/link";
import { ArrowBigUp } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserDropdown } from "./UserDropdown";

export async function Navbar() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className="h-[10vh] w-full flex items-center justify-between border-b px-5 lg:px-14">
            <Link href="/" className="flex items-center gap-x-3">
                <ArrowBigUp className="text-orange-600" />
                <h1 className="w-fit hidden lg:block text-2xl font-bold text-orange-600">Updoot</h1>
            </Link>

            <div className="flex items-center gap-x-4">
                <ThemeToggle />
                {user ? (
                    <UserDropdown userImage={user.picture} />
                ) : (
                    <div className="flex item-center gap-x-4">
                        <Button variant="secondary" asChild><RegisterLink>Sign up</RegisterLink></Button>
                        <Button asChild><LoginLink>Log in</LoginLink></Button>
                    </div>
                )}
            </div>
        </nav>
    )
}