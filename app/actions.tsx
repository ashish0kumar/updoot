"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma } from "@prisma/client";

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

        return redirect("/")

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