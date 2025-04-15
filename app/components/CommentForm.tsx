"use client"
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface iAppProps {
    postId: string
}

export function CommentForm({ postId }: iAppProps) {
    const ref = useRef<HTMLFormElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleCancel = () => {
        if (ref.current) {
            ref.current.reset();
        }
        setIsFocused(false);
    };

    return (
        <form
            className="mb-6"
            action={async (formData) => {
                await createComment(formData);
                ref.current?.reset();
                setIsFocused(false);
            }}
            ref={ref}
        >
            <input type="hidden" name="postId" value={postId} />
            <Textarea
                placeholder="Add a comment"
                className="w-[700px] mb-3 mt-6"
                name="comment"
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                    // Only check if clicking outside the form entirely
                    setTimeout(() => {
                        if (!ref.current?.contains(document.activeElement)) {
                            setIsFocused(false);
                        }
                    }, 100);
                }}
            />
            <div className="flex justify-between items-center pr-1 gap-x-4">
                <h1 className="font-medium mt-4">Comments</h1>
                {isFocused && (
                    <div className="flex gap-x-4">
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Comment</Button>
                    </div>
                )}
            </div>
        </form>
    );
}