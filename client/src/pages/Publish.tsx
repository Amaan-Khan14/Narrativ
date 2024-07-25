import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { APP_URL } from '../config';
import { AppBar } from '@/components/ui/Appbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { ReloadIcon } from '@radix-ui/react-icons';


export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const quillRef = useRef<Quill | null>(null);
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'direction': 'rtl' }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'font': [] }],
                        [{ 'align': [] }],
                        ['clean']
                    ]
                }
            });

            quillRef.current.on('text-change', () => {
                setContent(quillRef.current?.root.innerHTML || '');
            });
        }
    }, []);

    const handlePublish = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${APP_URL}/blog`, {
                title,
                description,
                content
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            if (response.data && response.data.blog && response.data.blog.id) {
                toast({
                    title: "Publish Successful",
                    description: "Your blog has been successfully published.",
                    duration: 5000,
                });

                navigate(`/blog/${response.data.blog.id}`);
            } else {
                toast({
                    title: "Publish Failed",
                    description: "An error occurred while publishing the blog. Please try again.",
                    variant: "destructive",
                    duration: 5000,
                })
            }
        } catch (error) {
            toast({
                title: "Publish Failed",
                description: "An error occurred while publishing the blog. Please try again.",
                variant: "destructive",
                duration: 5000,
            })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen'>
            <AppBar />
            <div className="flex justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl mt-8">
                    <Card className="rounded-2xl bg-inherit mb-5 shadow-2xl [box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.15)_inset] border-2 border-white/5 font-geistSans ">
                        <CardHeader>
                            <Input
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                className="w-full h-10 px-3 sm:px-5 py-6 sm:py-8 placeholder:text-xl sm:placeholder:text-2xl text-lg sm:text-xl text-stone-200 tracking-wider bg-inherit placeholder:text-stone-300 mb-5"
                            />
                            <Input
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                className="w-full h-10 px-3 sm:px-5 py-6 sm:py-8 placeholder:text-xl sm:placeholder:text-2xl text-lg sm:text-xl text-stone-200 tracking-wider bg-inherit placeholder:text-stone-300 "
                            />
                        </CardHeader>
                        <CardContent>
                            <div className=" [&_.ql-toolbar]:bg-stone-400  [&_.ql-toolbar]:border-gray-300  [&_.ql-toolbar]:flex  [&_.ql-toolbar]:flex-wrap  [&_.ql-toolbar]:justify-center  [&_.ql-toolbar]:p-2  [&_.ql-toolbar_.ql-formats]:mr-0  [&_.ql-toolbar_.ql-formats]:mb-2  [&_.ql-toolbar_.ql-stroke]:!stroke-zinc-700  [&_.ql-toolbar_.ql-fill]:!fill-zinc-700  [&_.ql-toolbar_.ql-picker-label]:!text-zinc-700  [&_.ql-toolbar_.ql-picker-item]:!text-zinc-700  [&_.ql-toolbar_.ql-picker-options]:!bg-zinc-200  [&_.ql-container]:bg-inherit  [&_.ql-container]:border-zinc-300  [&_.ql-editor]:text-stone-200 [&_.ql-editor]:min-h-[200px] [&_.ql-editor]:max-w-full [&_.ql-editor]:overflow-x-auto pb-10  w-full max-w-full overflow-x-hidden rounded-md ">
                                <div ref={editorRef} className="w-full text-lg tracking-wide rounded-sm" />
                            </div>
                            <CardFooter className="flex justify-center">
                                <Button
                                    onClick={handlePublish}
                                    type="button"
                                    className="w-full sm:w-auto text-lg sm:text-xl px-10 relative text-zinc-100 bg-stone-800 border-stone-800/30 text-md font-geistSans hover:border-zinc-600 hover:bg-transparent/20 hover:shadow-inner hover:text-zinc-950 flex items-center justify-center"
                                    variant="outline"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <ReloadIcon className="animate-spin mr-2" /> : 'Publish'}
                                </Button>
                            </CardFooter>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}