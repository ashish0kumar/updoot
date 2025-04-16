"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma, TypeOfVote } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateUsername(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const username = formData.get("username") as string;

    try {
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                userName: username,
            }
        })

        return {
            message: "Username updated!",
            status: "green",
        }

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return {
                    message: "Username already taken!",
                    status: "error",
                }
            }
        }

        throw e
    }
}

export async function createCommunity(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    try {
        const name = formData.get("name") as string;
        const desc = formData.get("description") as string;

        const data = await prisma.subreddit.create({
            data: {
                name: name,
                userId: user.id,
                description: desc,
            }
        })

        return redirect(`/r/${data.name}`)

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return {
                    message: "Community name already taken!",
                    status: "error",
                }
            }
        }

        throw e
    }
}

export async function updateSubDescription(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    try {
        const subName = formData.get("subName") as string;
        const desc = formData.get("description") as string;

        await prisma.subreddit.update({
            where: {
                name: subName,
            },
            data: {
                description: desc,
            }
        })

        return {
            message: "Description updated!",
            status: "green",
        }

    } catch (e) {
        return {
            message: "Something went wrong!",
            status: "error",
        }
    }
}

export async function createPost(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const title = formData.get("title") as string;
    const imageUrl = formData.get("imageUrl") as string | null;
    const subName = formData.get("subName") as string;
    const jsonContentStr = formData.get("jsonContent") as string;
    const jsonContent = jsonContentStr ? JSON.parse(jsonContentStr) : null;

    const data = await prisma.post.create({
        data: {
            title: title,
            imageString: imageUrl ?? undefined,
            subName: subName,
            userId: user.id,
            textContent: jsonContent ?? undefined,
        }
    })

    return redirect(`/post/${data.id}`);
}

export async function handleVote(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const postId = formData.get("postId") as string;
    const voteType = formData.get("voteType") as TypeOfVote;

    const vote = await prisma.vote.findFirst({
        where: {
            postId: postId,
            userId: user.id,
        }
    })

    if (vote) {
        if (vote.voteType === voteType) {
            await prisma.vote.delete({
                where: {
                    id: vote.id,
                }
            })

            return revalidatePath("/");

        } else {
            await prisma.vote.update({
                where: {
                    id: vote.id,
                },
                data: {
                    voteType: voteType,
                }
            })

            return revalidatePath("/");
        }
    }
        
    await prisma.vote.create({
        data: {
            voteType: voteType,
            postId: postId,
            userId: user.id,
        }
    })

    return revalidatePath("/");
}

export async function createComment(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const comment = formData.get("comment") as string;
    const postId = formData.get("postId") as string;

    const data = await prisma.comment.create({
        data: {
            text: comment,
            userId: user.id,
            postId: postId,
        }
    })

    return revalidatePath(`/post/${postId}`);
}