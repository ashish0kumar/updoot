"use client"

import { Textarea } from "@/components/ui/textarea"
import { SaveButton } from "./SubmitButtons"
import { updateSubDescription } from "../actions"
import { useFormState } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface iAppProps {
    subName: string;
    description: string | null | undefined;
}

const initialState = {
    message: "",
    status: "",
}

export function SubDescriptionForm({description, subName}: iAppProps) {
    const [state, formAction] = useFormState(updateSubDescription, initialState)
    const { toast } = useToast()

    useEffect(() => {
        if (state.status === "green") {
            toast({
                title: "Success",
                description: state.message,
            })
        } else if (state.status === "error") {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive",
            })
        }
    }, [state, toast])

    return (
        <form action={formAction} className="mt-5">
            <input type="hidden" name="subName" value={subName} />
            <Textarea
                placeholder="Create a description for your community" 
                maxLength={100} 
                name="description" 
                defaultValue={description ?? undefined}
            />
            <SaveButton />
        </form>
    )
}