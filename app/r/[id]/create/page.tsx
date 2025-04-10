import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import pfp from "../../../../public/pfp.png";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, Text } from "lucide-react";
import { Input } from "@/components/ui/input";

const rules = [
    {
        id: 1,
        text: "No spamming or self-promotion without mod approval",
    },
    {
        id: 2,
        text: "No hate speech, racism, or bigotry of any kind",
    },
    {
        id: 3,
        text: "No personal attacks, harassment, or witch-hunting",
    },
    {
        id: 4,
        text: "Keep posts relevant to the community topic",
    },
    {
        id: 5,
        text: "No NSFW content unless clearly tagged and allowed by the community",
    },
    {
        id: 6,
        text: "Use clear and descriptive titles",
    },
    {
        id: 7,
        text: "No misinformation or low-effort content",
    },
];

export default function CreatePostRoute({params}: { params: { id: string } }) {
    return (
        <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-6">
            <div className="w-[65%] flex flex-col gap-y-4">
                <h1 className="text-3xl font-extrabold tracking-tight">Create a Post</h1>
                <h1 className="font-semibold text-lg">
                    <Link href={`/r/${params.id}`}>
                        r/{params.id}
                    </Link>
                </h1>
                <Tabs defaultValue="text" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="text">
                            <Text className="h-4 w-4 mr-2" /> Text
                        </TabsTrigger>
                        <TabsTrigger value="image">
                            <ImageIcon className="h-4 w-4 mr-2" /> Image & Video
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent className="mt-4" value="text">
                        <Card>
                            <form>
                                <CardHeader>
                                    <Input required name="title" placeholder="Title" />
                                </CardHeader>
                            </form>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            <div className="w-[35%]">
                <Card className="flex flex-col p-5 shadow-lg">
                    <div className="flex items-center gap-x-2">
                        <Image className="h-10 w-10" src={pfp} alt="pfp" />
                        <h1 className="font-medium">Posting to Updoot</h1>
                    </div>

                    <Separator className="mt-2" />

                    <div className="flex flex-col gap-y-5 mt-5">
                        {rules.map((item) => (
                            <div key={item.id}>
                                <div className="flex items-center">
                                    <span className="mr-4 text-muted-foreground text-sm">{item.id}</span>
                                    <p className="text-sm text-muted-foreground">{item.text}</p>
                                </div>
                                {item.id !== rules.length && <Separator className="mt-3" />}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}