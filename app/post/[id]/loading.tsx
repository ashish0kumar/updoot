import { Skeleton } from "@/components/ui/skeleton";

export default function PostLoading() {
    return (
        <div className="flex max-w-[1200px] mx-auto gap-x-14 mt-6">
            <div className="w-[70%]">
                <div className="rounded-lg overflow-hidden border pr-6">
                    <div className="flex">
                        <div className="flex flex-col items-center py-4 w-12 pl-4">
                            <Skeleton className="h-6 w-6 rounded-md" />
                            <div className="my-2 flex flex-col items-center">
                                <Skeleton className="h-6 w-6 rounded-md" />
                            </div>
                            <Skeleton className="h-6 w-6 rounded-md" />
                        </div>

                        <div className="flex-1 p-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-32" />
                                </div>

                                <div>
                                    <Skeleton className="h-6 w-4/5" />
                                </div>

                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-11/12" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-11/12" />
                                </div>

                                <div className="flex items-center gap-4 pt-2">
                                    <Skeleton className="h-5 w-24" />
                                    <Skeleton className="h-5 w-16" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 ml-14">
                        <Skeleton className="h-20 w-full rounded-md" />
                    </div>

                    <div className="flex justify-between p-4 ml-14">
                        <Skeleton className="h-6 w-24" />
                        <div className="flex gap-2">
                            <Skeleton className="h-10 w-24 rounded-md" />
                            <Skeleton className="h-10 w-24 rounded-md" />
                        </div>
                    </div>

                    <div className="p-4 ml-14">
                        <div className="space-y-6">
                            {[1, 2, 3].map((_, index) => (
                                <div key={index} className="flex gap-3">
                                    <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                                    <div className="w-full">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-3/4 mt-1" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[30%] space-y-4">
                <div className="rounded-lg overflow-hidden border">
                    <div className="p-4 border-b">
                        <Skeleton className="h-6 w-1/2" />
                    </div>

                    <div className="p-4">
                        <div className="flex items-center mb-6">
                            <Skeleton className="h-16 w-16 rounded-full mr-3" />
                            <div>
                                <Skeleton className="h-6 w-32 mb-2" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <Skeleton className="h-5 w-full" />
                        </div>

                        <div className="mt-6">
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}