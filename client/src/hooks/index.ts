import { APP_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";



export interface Blog {
    createdAt: Date;
    id: number;
    author: {
        username: string;
    };
    description?: string;
    title: string;
    content: string;
}

export const useBlog = ({ id }: { id: number }) => {
    const [blog, setBlog] = useState<Blog>();
    const [isLoading, setIsLoading] = useState(true);  

    useEffect(() => {
        setIsLoading(true);  
        axios.get(`${APP_URL}/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(res => {
                setBlog(res.data.blog);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    return {
        blog,
        isLoading
    };

}

export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);  
    useEffect(() => {
        setIsLoading(true);  
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
                setIsLoading(false);  
            });
    }, []);

    return {
        blogs,  
        isLoading
    };
};