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

async function getData() {
  const data = await prisma.post.findMany({
    select: {
      title: true,
      createdAt: true,
      textContent: true,
      id: true,
      imageString: true,
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

  return data;
}

export default function Home() {
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-6 mb-10">
      <div className="w-[65%] flex flex-col gap-y-5">
        <CreatePostCard />

        <Suspense fallback={<SuspenseCard />}>
          <ShowItems />
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

async function ShowItems() {
  const data = await getData();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <>
      {data.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          jsonContent={post.textContent}
          imageString={post.imageString}
          subName={post.subName as string}
          userName={post.User?.userName as string}
          voteCount={post.votes.reduce((acc, vote) => acc + (vote.voteType === 'UP' ? 1 : -1), 0)}
          currentVote={user ? post.votes.find(vote => vote.userId === user.id)?.voteType || null : null}
        />
      ))}
    </>
  )
}