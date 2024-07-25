import { AppBar } from "@/components/ui/Appbar";
import { Card } from "@/components/ui/card";
import { ProfileCard } from "@/components/ui/Profilecard";
import { Skeleton } from "@/components/ui/skeleton";
import { UserCard } from "@/components/ui/UserCard";
import { useAllBlogs } from "@/hooks";
import { ReloadIcon } from "@radix-ui/react-icons";


export const Profile = () => {
    const { blogs, isLoading, isUser } = useAllBlogs();
    if (isLoading) {
        return (
            <div>
                <AppBar />
                <div className=" flex justify-center ">
                    <div className="w-1/2 mt-8 sm:block hidden">
                        <Card className="bg-inherit border-2 border-white/5 mb-5">
                            <div className="flex items-center space-x-4 m-10">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                        </Card>
                        <Card className="bg-inherit border-2 border-white/5 mb-2">
                            <div className="space-y-2 m-10">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </Card>
                        <Card className="bg-inherit border-2 border-white/5">
                            <div className="space-y-2 m-10">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </Card>
                    </div>
                    <ReloadIcon className="animate-spin sm:hidden block mt-96 h-24 w-24 text-stone-400" />
                </div>
            </div>
        )
    }

    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="w-1/2 mt-8">
                    <UserCard username={isUser?.username || ""} email={isUser?.email || ""} />
                    {blogs.map((blog) => (
                        <ProfileCard
                            id={blog.id}
                            title={blog.title}
                            createdAt={blog.createdAt}
                            description={blog.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}