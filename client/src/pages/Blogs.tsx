import { AppBar } from "@/components/ui/Appbar"
import { BlogCard } from "@/components/ui/blogcard"
import { useBlogs } from "@/hooks"
import { Skeleton } from "@/components/ui/skeleton"

export const Blogs = () => {
    const { blogs, isLoading } = useBlogs();

    if (isLoading) {
        return (
            <div>
                <AppBar />
                <div className="flex justify-center">
                    <div className="w-1/2 mt-8">
                        {[...Array(5)].map((_, index) => (
                            <Skeleton key={index} className="w-full h-[200px] bg-stone-100/50 rounded-lg mb-4" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="w-1/2 mt-8">
                    {blogs.map((blog) => (
                        <BlogCard
                            id={blog.id}
                            authorName={blog.author.username}
                            title={blog.title}
                            content={blog.content}
                            createdAt={blog.createdAt}
                            description={blog.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}