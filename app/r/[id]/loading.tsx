import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex w-full max-w-[1000px] mx-auto gap-x-10 mt-6">
            <div className="w-[65%] space-y-4">
                <div className="flex items-center rounded-lg overflow-hidden border p-4">
                    <div className="flex-shrink-0 mr-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                    <div className="flex-1">
                        <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                    <div className="flex gap-2 ml-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                </div>

                {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="flex rounded-lg overflow-hidden border">
                        <div className="flex flex-col items-center py-4 px-3 w-16">
                            <Skeleton className="h-6 w-6 rounded-md" />
                            <Skeleton className="h-6 w-8 my-2" />
                            <Skeleton className="h-6 w-6 rounded-md" />
                        </div>

                        <div className="flex-1 p-4">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-5 w-24 rounded-full" />
                                    <Skeleton className="h-4 w-32" />
                                </div>

                                <div>
                                    <Skeleton className="h-6 w-4/5" />
                                </div>

                                <div className="space-y-2">
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
                ))}
            </div>

            <div className="w-[35%] space-y-4">
                <div className="rounded-lg overflow-hidden border">
                    <div className="p-4 border-b">
                        <Skeleton className="h-6 w-1/2 mb-2" />
                    </div>

                    <div className="p-4">
                        <div className="flex items-center mb-4">
                            <Skeleton className="h-16 w-16 rounded-full mr-3" />
                            <div>
                                <Skeleton className="h-6 w-32 mb-2" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>

                        <Skeleton className="h-4 w-48" />

                        <div className="mt-6">
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}