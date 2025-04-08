"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export function SettingsForm({username}: { username: string | null | undefined }) {
    return (
        <form className="mx-auto">
            <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>

            <Separator className="my-4" />
            <p className="text-muted-foreground">This ain&apos;t Reddit, you can actually change your username here</p>

            <Input defaultValue={username ?? undefined} name="username" required className="my-3" min={2} maxLength={21} />

            <div className="w-full flex mt-5 gap-x-5 justify-end">
                <Button variant="secondary" asChild type="button">
                    <Link href="/">Cancel</Link>
                </Button>
                <Button>Change Username</Button>
            </div>
        </form>
    )
}