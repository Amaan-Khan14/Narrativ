import { APP_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";



interface Blog {
    id: string;
    author: {
        username: string;
    };
    title: string;
    content: string;
    publishedDate: string;
}

export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);  // Start with true

    useEffect(() => {
        setIsLoading(true);  // Set to true when starting the fetch
        axios.get(`${APP_URL}/blog/all`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(res => {
                setBlogs(res.data.blogs);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);  // Don't forget to set to false on error too
            });
    }, []);

    return {
        blogs,  // Changed from blog to blogs
        isLoading
    };
};