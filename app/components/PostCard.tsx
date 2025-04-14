"use client"

import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CopyLink } from "./CopyLink";
import { handleVote } from "../actions";
import { RenderToJson } from "./RenderToJson";
import { DownVote, UpVote } from "./SubmitButtons";

interface iAppProps {
    title: string;
    jsonContent: any;
    id: string;
    subName: string;
    userName: string;
    imageString: string | null;
    voteCount: number;
    currentVote?: 'UP' | 'DOWN' | null;
}

export function PostCard({
    title,
    jsonContent,
    id,
    subName,
    userName,
    imageString,
    voteCount,
    currentVote
}: iAppProps) {
    return (
        <Card className="flex relative overflow-hidden">
            <div className="flex flex-col items-center gap-y-2 p-2">
                <form action={handleVote}>
                    <input type="hidden" name="voteType" value="UP" />
                    <input type="hidden" name="postId" value={id} />
                    <UpVote currentVote={currentVote} />
                </form>
                <span className="font-medium">
                    {voteCount}
                </span>
                <form action={handleVote}>
                    <input type="hidden" name="voteType" value="DOWN" />
                    <input type="hidden" name="postId" value={id} />
                    <DownVote currentVote={currentVote} />
                </form>
            </div>
            <div>
                <div className="flex items-center gap-x-2 p-2">
                    <Image 
                        src={`https://avatar.vercel.sh/${subName}`} 
                        alt="subreddit image" 
                        width={10} 
                        height={10} 
                        className="rounded-full h-5 w-5"
                    />
                    <Link href={`/r/${subName}`} className="font-semibold text-xs">
                        r/{subName}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                        Posted by <span>u/{userName}</span>
                    </p>
                </div>
                <div className="px-2">
                    <Link href={`/post/${id}`}>
                        <h1 className="font-medium mt-1 text-lg">{title}</h1>
                    </Link>
                </div>
                <div className="max-h-[300px] overflow-hidden p-2">
                    {imageString ? (
                        <Image
                            src={imageString}
                            alt="Post image"
                            width={600}
                            height={300}
                            className="w-full h-full rounded-lg"
                        />
                    ) : (
                        <RenderToJson data={jsonContent} />
                    )}
                </div>
                <div className="mx-1 mt-2 mb-4 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-1">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        <p className="text-muted-foreground font-medium text-sm">15 Comments</p>
                    </div>
                    <CopyLink id={id} />
                </div>
            </div>
        </Card>
    )
}