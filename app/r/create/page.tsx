"use client"

import { createCommunity } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const intialState = {
    message: "",
    status: "",
}

export default function SubredditPage() {
    const [state, formAction] = useFormState(createCommunity, intialState);
    const { toast } = useToast();

    useEffect(() => {
        if (state.status === "error") {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive",
            })
        }
    }, [state, toast])

    return (
        <div className="mx-auto flex flex-col mt-4">
            <form action={formAction} className="mx-auto">
                <h1 className="text-3xl font-extrabold tracking-tight mt-4">
                    Create Community
                </h1>
                <Separator className="my-4" />
                <p className="text-muted-foreground">
                    A name and description help people understand what your community is all about.
                </p>

                <div className="relative mt-4">
                    <p className="absolute left-1 w-8 flex items-center justify-center h-full text-muted-foreground">
                        r/ 
                    </p>
                    <Input name="name" required className="pl-7" minLength={2} maxLength={21} placeholder="Community name *" />
                </div>

                <p className="text-destructive mt-2">{state.message}</p>

                <div className="w-full flex mt-5 gap-x-5 justify-end">
                    <Button variant="secondary" asChild type="button">
                        <Link href="/">Cancel</Link>
                    </Button>
                    <SubmitButton text="Create Community" />
                </div>
            </form>
        </div>
    )
}