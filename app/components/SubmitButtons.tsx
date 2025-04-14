"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"

export function SubmitButton({text}: { text: string }) {
    const { pending } = useFormStatus()
    return (
        <>
            {pending ? (
                <Button disabled>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please wait...
                </Button>
            ) : (
                <Button type="submit">{text}</Button>
            )}
        </>
    )
}

export function SaveButton() {
    const { pending } = useFormStatus()
    return (
        <>
            {pending ? (
                <Button className="mt-4 w-full" disabled size="sm">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please wait...
                </Button>
            ) : (
                <Button className="mt-4 w-full" size="sm" type="submit">
                    Save
                </Button>
            )}
        </>
    )
}

export function UpVote({currentVote}: { currentVote: 'UP' | 'DOWN' | null | undefined }) {
    const { pending } = useFormStatus()
    return (
        <>
            {pending ? (
                <Button variant={currentVote === 'UP' ? 'default' : 'secondary'} className="rounded-full" size="sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                </Button>
            ) : (
                <Button variant={currentVote === 'UP' ? 'default' : 'secondary'} className="rounded-full" size="sm">
                    <ArrowUp className="w-4 h-4" />
                </Button>
            )}
        </>
    )
}

export function DownVote({ currentVote }: { currentVote: 'UP' | 'DOWN' | null | undefined }) {
    const { pending } = useFormStatus()
    return (
        <>
            {pending ? (
                <Button variant={currentVote === 'DOWN' ? 'downvote' : 'secondary'} className="rounded-full" size="sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                </Button>
            ) : (
                <Button variant={currentVote === 'DOWN' ? 'downvote' : 'secondary'} className="rounded-full" size="sm">
                    <ArrowDown className="w-4 h-4" />
                </Button>
            )}
        </>
    )
}