// import { Hono } from "hono";
// import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate'
// import { decode, jwt, sign, verify } from 'hono/jwt'

// export const userRouter = new Hono<{
//     Bindings: {
//         DATABASE_URL: string;
//         JWT_SECRET: string;
//     }
// }>()

// userRouter.post('/signup', async (c) => {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate())

//     const body = await c.req.json()

//     if (!body) {
//         return c.json({ error: 'No body' }, 400)
//     }
//     try {

//         const user = await prisma.user.create({
//             data: {
//                 email: body.email,
//                 password: body.password,
//                 username: body.username
//             },
//             select: {
//                 email: true,
//                 username: true
//             }
//         })
//         return c.json({ message: 'User created', user: user })
//     } catch (error) {
//         return c.json({ message: "User already exists" }, 400)
//     }
// })


// userRouter.post('/signin', async (c) => {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate())

//     const body = await c.req.json()

//     if (!body) {
//         return c.json({ error: 'No body' }, 400)
//     }

//     const user = await prisma.user.findFirst({
//         where: {
//             email: body.email
//         }
//     })

//     if (!user) {
//         return c.json({ message: 'User not found' }, 400)
//     }

//     if (user.password !== body.password) {
//         return c.json({ message: 'Invalid password' }, 400)
//     }

//     const token = await sign({
//         id: user.id,
//         email: user.email
//     }, c.env.JWT_SECRET)

//     return c.json({ message: 'Logged in', token: token })
// })