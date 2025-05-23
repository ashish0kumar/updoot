import { Card } from "@/components/ui/card";
import Image from "next/image";
import Banner from "@/public/banner.png";
import HelloImage from "@/public/hero-image.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreatePostCard } from "./components/CreatePostCard";
import prisma from "./lib/db";
import { PostCard } from "./components/PostCard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";
import { SuspenseCard } from "./components/SuspenseCard";
import Pagination from "./components/Pagination";
import { FileQuestion } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache"

async function getData(searchParams: string) {
  noStore()
  const [count, data] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
      take: 10,
      skip: searchParams ? (Number(searchParams) - 1) * 10 : 0,
      select: {
        title: true,
        createdAt: true,
        textContent: true,
        id: true,
        imageString: true,
        comments: {
          select: {
            id: true
          }
        },
        User: {
          select: {
            userName: true,
          }
        },
        subName: true,
        votes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  ])

  return {count, data};
}

export default function Home({ searchParams }: { searchParams: { page: string }}) {
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-6 mb-10">
      <div className="w-[65%] flex flex-col gap-y-5">
        <CreatePostCard />

        <Suspense fallback={<SuspenseCard />} key={searchParams.page}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
      <div className="w-[35%]">
        <Card>
          <Image src={Banner} alt="banner" />
          <div className="p-3">
            <div className="flex items-center">
              <Image src={HelloImage} alt="reddit mascot" className="w-10 h-16 -mt-8" />
              <h1 className="font-medium pl-3">Home</h1>
            </div>
            <p className="text-sm text-muted-foreground pt-3 px-2">
              Your Updoot frontpage — stay updated with the freshest posts from all your favorite communities, all in one place.
            </p>

            <Separator className="my-5" />

            <div className="flex flex-col gap-y-4 mb-3">
              <Button asChild variant="secondary" className="rounded-full mx-2">
                <Link href="/r/community/create">Create Post</Link>
              </Button>
              <Button asChild className="rounded-full mx-2">
                <Link href="/r/create">Create Community</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

async function ShowItems({ searchParams }: { searchParams: { page: string } }) {
  const {count, data} = await getData(searchParams.page);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <>
      {data.length === 0 ? (
        <div className="flex min-h-[300px] flex-col justify-center items-center rounded-md border border-dashed p-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <FileQuestion className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            No posts yet
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Be the first to create a post on Updoot!
          </p>
        </div>
      ) : (
        <>
          {data.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            jsonContent={post.textContent}
            imageString={post.imageString}
            commentsCount={post.comments.length}
            subName={post.subName as string}
            userName={post.User?.userName as string}
            voteCount={post.votes.reduce((acc, vote) => acc + (vote.voteType === 'UP' ? 1 : -1), 0)}
            currentVote={user ? post.votes.find(vote => vote.userId === user.id)?.voteType || null : null}
          />
          ))}

      <Pagination totalPages={Math.ceil(count / 10)} />
        </>
      )}
    </>
  )
}