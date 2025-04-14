"use client";

import { useToast } from "@/hooks/use-toast";
import { Share } from "lucide-react";

export function CopyLink({ id, variant }: { id: string, variant?: string }) {

    const { toast } = useToast();

    async function copyToClipboard() {
        await navigator.clipboard.writeText(`${location.origin}/post/${id}`);
        toast({
            title: "Success",
            description: "Link copied to clipboard",
        })
    }

    return (
        <>
            {variant === "lg" ? (
                <button className="flex items-center gap-x-1" onClick={copyToClipboard}>
                    <Share className="h-5 w-5 text-muted-foreground" />
                    <p className="font-medium text-md text-muted-foreground">Share</p>
                </button>
            ) : (
                <button className="flex items-center gap-x-1" onClick={copyToClipboard}>
                    <Share className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium text-sm text-muted-foreground">Share</p>
                </button>
            )}
        </>
    )
}