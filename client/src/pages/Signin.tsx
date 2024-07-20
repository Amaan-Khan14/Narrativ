import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInSchema } from "@amaank14/narrativ-common";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../config";
import { useNavigate } from 'react-router-dom';


export const Signin = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState<SignInSchema>({
        email: '',
        password: ''
    })

    async function handleSubmit() {
        try {
            const res = await axios.post(`${API_URL}/user/signin`, inputs)
            localStorage.setItem('token', res.data.token)
            navigate('/blogs')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex items-center justify-center md:visible invisible">
            <Card className="relative bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] mt-36 w-2/5 h-1/2 shadow-2xl border-2 border-white/5 text-md font-geistSans  ">
                <CardHeader>
                    <CardTitle className="text-center bg-gradient-to-b from-zinc-50 via-stone-400 to-gray-200 text-transparent bg-clip-text text-4xl">Log In to Your Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col space-y-4'>
                        <Label className="bg-gradient-to-tr from-zinc-100 via-zinc-200/50 to-zinc-200/90 text-transparent bg-clip-text text-xl">Email</Label>
                        <Input
                            type='email'
                            placeholder='Email'
                            className="my-2 bg-transparent/10 border-2 border-white/30 text-white text-lg focus:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] focus:border-white/50"
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}

                        />
                        <Label className="bg-gradient-to-tr from-zinc-100 via-zinc-200/50 to-zinc-200/90 text-transparent bg-clip-text text-xl">Password</Label>
                        <Input
                            type='password'
                            placeholder='Password'
                            className="my-2 bg-transparent/10 border-2 border-white/30 text-white text-lg focus:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] focus:border-white/50"
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center">
                    <Button onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }} type="submit" className="text-lg px-10 relative hover:text-zinc-100 bg-page-gradient border-stone-800/30 text-md font-geistSans hover:border-zinc-600 hover:bg-transparent/20 hover:shadow-inner hover:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] text-zinc-700" variant="outline">
                        Sign In
                    </Button>
                    <p className="mt-2 bg-gradient-to-tr from-zinc-50 to-gray-200 bg-clip-text text-transparent"> New here?<a href="/signup" className=""> Create an account</a></p>
                </CardFooter>
            </Card>
        </div>

    );
}

