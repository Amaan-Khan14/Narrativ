import { FullBlog } from "@/components/ui/FullBlog";
import { useBlog } from "@/hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { blog, isLoading } = useBlog({ id: Number(useParams().id) });
    if (isLoading) {
        return (
            <div className="flex justify-center">
                <div className="w-1/2 mt-8">
                    <div className="w-full h-[200px] bg-stone-100/50 rounded-lg mb-4" />
                    <div className="w-full h-[200px] bg-stone-100/50 rounded-lg mb-4" />
                    <div className="w-full h-[200px] bg-stone-100/50 rounded-lg mb-4" />
                </div>
            </div>
        )
    }
    return (
        <div>
            <FullBlog blog={blog}></FullBlog>
        </div>
    )
}