"use client"

import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface iAppProps {
    postId: string
}

export function CommentForm({ postId }: iAppProps) {
    const ref = useRef<HTMLFormElement>(null)

    return (
        <form 
            className="mb-6" 
            action={async (formData) => {
                await createComment(formData)
                ref.current?.reset()
            }}
            ref={ref}
        >
            <input type="hidden" name="postId" value={postId} />
            <Textarea
                placeholder="Add a comment"
                className="w-[700px] mb-3 mt-6"
                name="comment"     
            />
            <div className="flex justify-between items-center pr-1 gap-x-4">
                <h1 className="font-medium">Comments</h1>
                <div className="flex gap-x-4">
                    <Button variant="secondary" type="reset">Cancel</Button>
                    <Button type="submit">Comment</Button>
                </div>
            </div>
        </form>
    )
}