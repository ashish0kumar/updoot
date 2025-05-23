"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { updateUsername } from "../actions"
import { SubmitButton } from "./SubmitButtons"
import { useFormState } from "react-dom"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

const initialState = {
    message: "",
    status: "",
}

export function SettingsForm({username}: { username: string | null | undefined }) {
    const [state, formAction] = useFormState(updateUsername, initialState)
    const { toast } = useToast()

    useEffect(() => {
        if (state?.status === "green") {
            toast({
                title: "Successful",
                description: state.message,
            })
        } else if (state?.status === "error") {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive"
            })
        }
    }, [state, toast])

    return (
        <form action={formAction} className="mx-auto">
            <h1 className="text-3xl font-extrabold tracking-tight mt-4">Settings</h1>

            <Separator className="my-4" />
            <p className="text-muted-foreground">This ain&apos;t Reddit, you can actually change your username here</p>

            <Input defaultValue={username ?? undefined} name="username" required className="my-3" min={2} maxLength={21} />

            {state?.status === "error" && (
                <p className="text-destructive mt-2">{state.message}</p>
            )}

            <div className="w-full flex mt-5 gap-x-5 justify-end">
                <Button variant="secondary" asChild type="button">
                    <Link href="/">Cancel</Link>
                </Button>
                <SubmitButton text="Change Username" />
            </div>
        </form>
    )
}