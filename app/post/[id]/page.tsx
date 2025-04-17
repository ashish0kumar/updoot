import { handleVote } from "@/app/actions"
import { CommentForm } from "@/app/components/CommentForm"
import { CopyLink } from "@/app/components/CopyLink"
import { RenderToJson } from "@/app/components/RenderToJson"
import { DownVote, UpVote } from "@/app/components/SubmitButtons"
import prisma from "@/app/lib/db"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { CakeSlice, MessageCircle, MessageSquareOff } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"

async function getData(id: string) {
    noStore()
    const data = await prisma.post.findUnique({
        where: {
            id: id,
        },
        select: {
            createdAt: true,
            title: true,
            imageString: true,
            textContent: true,
            subName: true,
            id: true,
            votes: {
                select: {
                    userId: true,
                    voteType: true,
                }
            },
            comments: {
                orderBy: {
                    createdAt: "desc"
                },
                select: {
                    id: true,
                    text: true,
                    User: {
                        select: {
                            userName: true,
                            imageUrl: true,
                            email: true,
                            id: true,
                        }
                    }
                }
            },
            Subreddit: {
                select: {
                    name: true,
                    createdAt: true,
                    description: true,
                }
            },
            User: {
                select: {
                    userName: true,
                }
            }
        }
    })

    if (!data) {
        return notFound()
    }

    return data
}

export default async function PostPage({ params }: { params: { id: string } }) {
    const data = await getData(params.id)
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    return (
        <div className="max-w-[1200px] mx-auto flex gap-x-14 mt-6 mb-10">
            <div className="w-[70%] flex flex-col gap-y-5">
                <Card className="flex overflow-hidden pl-2 pt-2 pr-8 pb-6">
                    <div className="flex">
                        <div className="flex flex-col items-center gap-y-2 p-2">
                            <form action={handleVote}>
                                <input type="hidden" name="voteType" value="UP" />
                                <input type="hidden" name="postId" value={data.id} />
                                <UpVote currentVote={user ? data.votes.find(vote => vote.userId === user.id)?.voteType || null : null} />
                            </form>
                            <span className="font-medium">
                                {data.votes.reduce((acc, vote) => acc + (vote.voteType === 'UP' ? 1 : -1), 0)}
                            </span>
                            <form action={handleVote}>
                                <input type="hidden" name="voteType" value="DOWN" />
                                <input type="hidden" name="postId" value={data.id} />
                                <DownVote currentVote={user ? data.votes.find(vote => vote.userId === user.id)?.voteType || null : null} />
                            </form>
                        </div>

                        <div>
                            <div className="flex items-center gap-x-2 p-2">
                                <Image
                                    src={`https://avatar.vercel.sh/${data.subName}`}
                                    alt="subreddit image"
                                    width={10}
                                    height={10}
                                    className="rounded-full h-6 w-6"
                                />
                                <Link href={`/r/${data.subName}`} className="font-semibold text-sm">
                                    r/{data.subName}
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                    Posted by <span>u/{data.User?.userName}</span>
                                </p>
                            </div>
                            <div className="px-2">
                                <Link href={`/post/${data.id}`}>
                                    <h1 className="font-medium mt-1 text-xl">{data.title}</h1>
                                </Link>
                            </div>
                            <div className="overflow-hidden px-2 py-3">
                                {data.imageString && (
                                    <div className="relative w-full max-h-[600px] overflow-hidden rounded-lg mb-4">
                                        <Image
                                            src={data.imageString}
                                            alt="Post image"
                                            width={1200}
                                            height={800}
                                            className="w-full object-contain max-h-[600px] rounded-lg"
                                            priority
                                        />
                                    </div>
                                )}

                                {data.textContent && (
                                    <RenderToJson data={data.textContent} />
                                )}
                            </div>
                            <div className="mx-1 mt-2 mb-4 flex items-center gap-x-5">
                                <div className="flex items-center gap-x-1">
                                    <MessageCircle className="h-5 w-5 text-muted-foreground" />
                                    <p className="text-muted-foreground font-medium text-md">{data.comments.length} {data.comments.length > 1 ? "Comments" : "Comment"}</p>
                                </div>
                                <CopyLink id={data.id} variant="lg" />
                            </div>

                            <CommentForm postId={params.id} />

                            {data.comments.length > 0 ? (
                                <div className="flex flex-col gap-y-7 mb-4">
                                    {data.comments.map((comment) => (
                                        <div key={comment.id} className="flex flex-col">
                                            <div className="flex items-center gap-x-3">
                                                <img
                                                    src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${comment.User?.email || comment.User?.id}`}
                                                    className="w-7 h-7 rounded-full"
                                                    alt="user avatar"
                                                />

                                                <h3 className="text-sm font-medium">
                                                    u/{comment.User?.userName}
                                                </h3>
                                            </div>

                                            <p className="ml-10 mt-1 text-secondary-foreground text-sm tracking-wide">
                                                {comment.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex min-h-[200px] flex-col justify-center items-center rounded-md border border-dashed p-6 text-center my-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                        <MessageSquareOff className="h-8 w-8 text-primary" />
                                    </div>
                                    <h2 className="mt-4 text-lg font-semibold">
                                        No comments yet
                                    </h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Be the first to share your thoughts!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </div>

            <div className="w-[30%]">
                <Card className="pb-2">
                    <div className="bg-muted rounded-md p-4 font-semibold">About Community</div>
                    <div className="p-4">
                        <div className="flex items-center gap-x-4">
                            <Image
                                src={`https://avatar.vercel.sh/${data?.subName}`}
                                alt="subreddit image"
                                width={60}
                                height={60}
                                className="rounded-full h-16 w-16"
                            />
                            <Link href={`/r/${data?.subName}`} className="font-medium">r/{data?.subName}</Link>
                        </div>

                        <p className="text-sm font-normal text-secondary-foreground mt-5 pl-2">
                            {data?.Subreddit?.description}
                        </p>

                        <div className="flex item-center gap-x-2 mt-4 pl-2">
                            <CakeSlice className="h-4 w-4 text-muted-foreground" />
                            <p className="text-muted-foreground font-medium text-sm">
                                Created{" "}
                                {new Date(data?.createdAt as Date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </p>
                        </div>

                        <Separator className="my-5" />

                        <Button asChild className="rounded-full w-full">
                            <Link href={user?.id ? `/r/${data?.subName}/create` : "/api/auth/login"}>
                                Create Post
                            </Link>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}