import Link from "next/link";
import { ArrowBigUp } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="h-[10vh] w-full flex items-center justify-between border-b px-5 lg:px-14">
            <Link href="/" className="flex items-center gap-x-3">
                <ArrowBigUp className="text-orange-600" />
                <h1 className="w-fit hidden lg:block text-2xl font-bold text-orange-600">Updoot</h1>
            </Link>

            <div className="flex items-center gap-x-4">
                <ThemeToggle />
                <Button variant="secondary">Sign up</Button>
                <Button>Log in</Button>
            </div>
        </nav>
    )
}