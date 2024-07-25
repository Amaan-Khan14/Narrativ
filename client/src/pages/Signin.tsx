import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInSchema } from "@amaank14/narrativ-common";
import axios from "axios";
import { useState } from "react";
import { APP_URL } from "../config";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";


export const Signin = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState<SignInSchema>({
        email: '',
        password: ''
    })

    async function handleSubmit() {
        setIsLoading(true);
        try {
            const res = await axios.post(`${APP_URL}/user/signin`, inputs)
            localStorage.setItem('token', res.data.token)
            toast({
                title: "Sign In Successful",
                description: "Welcome back! You've successfully signed in.",
                duration: 5000,
            })
            navigate('/blogs')
        } catch (error) {
            console.log(error)
            let errorMessage = "An error occurred during sign in. Please try again.";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            }

            toast({
                title: "Sign In Failed",
                description: errorMessage,
                variant: "destructive",
                duration: 5000,
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center w-full px-4 sm:px-0">
            <Card className="relative bg-page-gradient [box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.15)_inset] mt-8 sm:mt-36 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 shadow-2xl border-2 border-white/5 text-md font-geistSans">
                <CardHeader>
                    <CardTitle className="text-center bg-gradient-to-b from-zinc-50 via-stone-400 to-gray-200 text-transparent bg-clip-text text-2xl sm:text-4xl">Log In to Your Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col space-y-4'>
                        <Label className="bg-gradient-to-tr from-zinc-100 via-zinc-200/50 to-zinc-200/90 text-transparent bg-clip-text text-lg sm:text-xl">Email</Label>
                        <Input
                            type='email'
                            placeholder='Email'
                            className="my-2 bg-transparent/10 border-2 border-white/30 text-white text-base sm:text-lg focus:[box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.15)_inset] focus:border-white/50"
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        />
                        <Label className="bg-gradient-to-tr from-zinc-100 via-zinc-200/50 to-zinc-200/90 text-transparent bg-clip-text text-lg sm:text-xl">Password</Label>
                        <Input
                            type='password'
                            placeholder='Password'
                            className="my-2 bg-transparent/10 border-2 border-white/30 text-white text-base sm:text-lg focus:[box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.15)_inset] focus:border-white/50"
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center">
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        type="button"
                        className="text-base sm:text-lg px-6 sm:px-10 relative hover:text-zinc-100 bg-page-gradient border-stone-800/30 font-geistSans hover:border-zinc-600 hover:bg-transparent/20 hover:shadow-inner hover:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] text-zinc-700 flex items-center justify-center"
                        variant="outline"
                        disabled={isLoading}
                    >
                        {isLoading ? <ReloadIcon className="animate-spin mr-2" /> : 'Sign In'}
                    </Button>
                    <p className="mt-2 bg-gradient-to-tr from-zinc-50 to-gray-200 bg-clip-text text-transparent text-sm sm:text-base">
                        New here? <a href="/signup" className="underline"> Create an account</a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

