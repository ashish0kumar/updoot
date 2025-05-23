import { CreatePostCard } from "@/app/components/CreatePostCard";
import Pagination from "@/app/components/Pagination";
import { PostCard } from "@/app/components/PostCard";
import { SubDescriptionForm } from "@/app/components/SubDescriptionForm";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CakeSlice, FileQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache"

async function getData(name: string, searchParams: string) {
    noStore()
    const [count, data] = await prisma.$transaction([
        prisma.post.count(),
        prisma.subreddit.findUnique({
            where: {
                name: name,
            },
            select: {
                name: true,
                createdAt: true,
                updatedAt: true,
                description: true,
                userId: true,
                posts: {
                    take: 10,
                    skip: searchParams ? (Number(searchParams) - 1) * 10 : 0,
                    select: {
                        title: true,
                        imageString: true,
                        id: true,
                        textContent: true,
                        comments: {
                            select: {
                                id: true,
                            }
                        },
                        votes: {
                            select: {
                                userId: true,
                                voteType: true,
                            }
                        },
                        User: {
                            select: {
                                userName: true,
                            }
                        }
                    }
                }
            }
        })
    ])

    if (!data) {
        return notFound();
    }

    return {count, data};
}

export default async function SubredditRoute({params, searchParams}: {params: { id: string }, searchParams: { page: string }}) {
    const {count, data} = await getData(params.id, searchParams.page);
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-6 mb-10">
            <div className="w-[65%] flex flex-col gap-y-5">
                <CreatePostCard />

                {data?.posts.length === 0 ? (
                    <div className="flex min-h-[300px] flex-col justify-center items-center rounded-md border border-dashed p-8 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                            <FileQuestion className="h-10 w-10 text-primary" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold">
                            No posts yet
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                            Be the first to create a post in this community!
                        </p>
                    </div>
                ) : (
                        <>
                            {data?.posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    id={post.id}
                                    title={post.title}
                                    jsonContent={post.textContent}
                                    imageString={post.imageString}
                                    commentsCount={post.comments.length}
                                    subName={data.name}
                                    userName={post.User?.userName as string}
                                    voteCount={post.votes.reduce((acc, vote) => acc + (vote.voteType === 'UP' ? 1 : -1), 0)}
                                    currentVote={user ? post.votes.find(vote => vote.userId === user.id)?.voteType || null : null}
                                />
                            ))}
                            <Pagination totalPages={Math.ceil(count / 10)} />
                        </>
                )}
            </div>

            <div className="w-[35%]">
                <Card className="pb-2">
                    <div className="bg-muted rounded-md p-4 font-semibold">About Community</div>
                    <div className="p-4">
                        <div className="flex items-center gap-x-4">
                            <Image 
                                src={`https://avatar.vercel.sh/${data?.name}`} 
                                alt="subreddit image" 
                                width={60} 
                                height={60} 
                                className="rounded-full h-16 w-16"
                            />
                            <Link href={`/r/${data?.name}`} className="font-medium">r/{data?.name}</Link>
                        </div>

                        {user?.id === data?.userId ? (
                            <SubDescriptionForm description={data?.description} subName={params.id} />
                        ): (
                            <p className="text-sm font-normal text-secondary-foreground mt-5 pl-2">
                                {data?.description}
                            </p>
                        )}

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
                            <Link href={user?.id ? `/r/${data?.name}/create` : "/api/auth/login"}>
                                Create Post
                            </Link>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}