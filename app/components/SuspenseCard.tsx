import { Skeleton } from '@/components/ui/skeleton'

export function SuspenseCard() {
    return (
        <div className="space-y-4 w-full max-w-2xl mx-auto">
            <div className="flex rounded-lg overflow-hidden border">
                <div className="flex flex-col items-center py-4 px-3 w-16">
                    <Skeleton className="h-6 w-6 rounded-md" />
                    <Skeleton className="h-6 w-8 my-2" />
                    <Skeleton className="h-6 w-6 rounded-md" />
                </div>

                <div className="flex-1 p-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-24" />
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

            <div className="flex rounded-lg overflow-hidden border">
                <div className="flex flex-col items-center py-4 px-3 w-16">
                    <Skeleton className="h-6 w-6 rounded-md" />
                    <Skeleton className="h-6 w-8 my-2" />
                    <Skeleton className="h-6 w-6 rounded-md" />
                </div>

                <div className="flex-1 p-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-24" />
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

            <div className="flex rounded-lg overflow-hidden border">
                <div className="flex flex-col items-center py-4 px-3 w-16">
                    <Skeleton className="h-6 w-6 rounded-md" />
                    <Skeleton className="h-6 w-8 my-2" />
                    <Skeleton className="h-6 w-6 rounded-md" />
                </div>

                <div className="flex-1 p-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-24" />
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

            <div className="flex rounded-lg overflow-hidden border">
                <div className="flex flex-col items-center py-4 px-3 w-16">
                    <Skeleton className="h-6 w-6 rounded-md" />
                    <Skeleton className="h-6 w-8 my-2" />
                    <Skeleton className="h-6 w-6 rounded-md" />
                </div>

                <div className="flex-1 p-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-24" />
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
        </div>
    )
}