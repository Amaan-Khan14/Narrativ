import { AppBar } from "@/components/ui/Appbar"
import { BlogCard } from "@/components/ui/blogcard"
import { useBlogs } from "@/hooks"


export const Blogs = () => {
    const { blogs, isLoading } = useBlogs();

    if (isLoading) {
        return <div>Loading...</div>;  // Or any loading indicator
    }
    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="w-1/2 mt-8">
                    {blogs.map((blog) => (
                        <BlogCard
                            authorName={blog.author.username}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={blog.publishedDate}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}