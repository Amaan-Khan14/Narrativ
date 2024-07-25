import z from 'zod';

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string().min(3),
})

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})


export const createBlogSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    content: z.string().min(10),
})

export const updateBlogSchema = z.object({
    title: z.string().min(3).optional(),
    content: z.string().min(10).optional(),
})

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;