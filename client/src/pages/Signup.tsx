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
import { SignUpSchema } from "@amaank14/narrativ-common";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../config";
import { Link, useNavigate } from 'react-router-dom';


export const Signup = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState<SignUpSchema>({
        username: '',
        email: '',
        password: ''
    })

    async function handleSubmit() {
        try {
            const res = await axios.post(`${API_URL}/user/signup`, inputs)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex items-center justify-center sm:visible invisible">
            <Card className="relative bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] mt-36 w-2/5 h-1/2 shadow-2xl border-2 border-white/5 text-md font-geistSans  ">
                <CardHeader>
                    <CardTitle className="text-center bg-gradient-to-b from-zinc-50 via-stone-400 to-gray-200 text-transparent bg-clip-text text-4xl">Create Your Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col space-y-4'>
                        <Label className="bg-gradient-to-tr from-zinc-100 via-zinc-200/50 to-zinc-200/90 text-transparent bg-clip-text text-lg">Username</Label>
                        <Input
                            type='text'
                            placeholder='Username'
                            className="my-2 bg-transparent/10 border-2 border-white/30 text-white text-lg focus:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] focus:border-white/50"
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                        <Label className="bg-gradient-to-tr from-zinc-100 via-zinc-200/50 to-zinc-200/90 text-transparent bg-clip-text text-lg">Email</Label>

                        <Input
                            type='email'
                            placeholder='Email'
                            className="my-2 bg-transparent/10 border-2 border-white/30 text-white text-lg focus:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] focus:border-white/50"
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}

                        />
                        <Label className="bg-gradient-to-tr from-zinc-100 via-zinc-200/50 to-zinc-200/90 text-transparent bg-clip-text text-lg">Password</Label>
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
                        Sign Up
                    </Button>
                    <p className="mt-2 bg-gradient-to-tr from-zinc-50 to-gray-200 bg-clip-text text-transparent"> Already a member? <Link to='/login'>Signin</Link></p>
                </CardFooter>
            </Card>
        </div>

    );
}   
