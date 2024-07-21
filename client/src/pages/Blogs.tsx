import { AppBar } from "@/components/ui/Appbar"
import { BlogCard } from "@/components/ui/blogcard"

export const Blogs = () => {
    return (
        <div>
            <AppBar authorName="amaan khan" />
            <div className="flex justify-center">
                <div className="w-1/2 mt-24">
                    <BlogCard
                        authorName="John Doe"
                        title="The Future of Web Development"
                        content="In this article, we explore emerging trends in web development, including the rise of JAMstack, the growing importance of performance optimization, and the impact of AI on frontend design."
                        publishedDate="2024-07-15"
                    />
                    <BlogCard
                        authorName="John Doe"
                        title="The Future of Web Development"
                        content="In this article, we explore emerging trends in web development, including the rise of JAMstack, the growing importance of performance optimization, and the impact of AI on frontend design."
                        publishedDate="2024-07-1"
                    />
                </div>
            </div>
        </div>
    )
}