import { Hono } from "hono";
import { jwt, verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogSchema } from "@amaank14/narrativ-common";

export const blogrouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        authorId: string;
    }
}>();

blogrouter.use("/*", async (c, next) => {
    const token = await c.req.header("Authorization") as string
    if (!token) {
        return c.json({ message: "No token" }, 401)
    }
    try {
        const user = await verify(token, c.env.JWT_SECRET)
        if (!user) {
            return c.json({ message: "Invalid token" }, 401)
        }
        c.set("authorId", user.id as string)
        await next()
    } catch (error) {
        return c.json({ message: "Invalid token" }, 401)
    }

})

blogrouter.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()

    const { success, error } = createBlogSchema.safeParse(body)
    if (!success) return c.json({ message: "Invalid body", error: error.issues }, 400)

    const authorId = c.get("authorId")
    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            },
            select: {
                id: true,
                title: true,
                content: true
            }
        })

        return c.json({ message: "Blog created", blog: blog }, 201)
    } catch (error) {
        return c.json({ message: "Error creating blog" }, 400)
    }
})

blogrouter.get("/:id{[0-9]+}", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param("id")

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        username: true
                    }
                }
            }
        })

        if (!blog) {
            return c.json({ message: "Blog not found" }, 404)
        }

        return c.json({ blog })
    } catch (error) {
        return c.json({ message: "Error fetching blogs" }, 400)
    }
})
blogrouter.put("/:id{[0-9]+}", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param("id")
    const body = await c.req.json()

    const { success, error } = createBlogSchema.safeParse(body)
    if (!success) return c.json({ message: "Invalid body", error: error.issues }, 400)

    const authorId = c.get("authorId")

    if (!authorId) {
        return c.json({ message: "Unauthorized" }, 401)
    }

    try {
        const blog = await prisma.blog.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!blog) {
            return c.json({ message: "Blog not found" }, 404)
        }

        if (blog.authorId !== Number(authorId)) {
            return c.json({ message: "Unauthorized to update this blog" }, 403)
        }

        const updatedBlog = await prisma.blog.update({
            where: {
                id: Number(id)
            },
            data: {
                title: body.title,
                content: body.content,
            },
            select: {
                id: true,
                title: true,
                content: true
            }
        })

        return c.json({ message: "Blog updated", blog: updatedBlog })
    } catch (error) {
        return c.json({ message: "Error updating blog" }, 400)
    }
})

blogrouter.get("/all", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.blog.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        username: true
                    }

                }
            }
        })

        return c.json({ blogs: blogs, })
    } catch (error) {
        return c.json({ message: "Error fetching blogs" }, 400)
    }
})

blogrouter.delete("/:id{[0-9]+}", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param("id")
    const authorId = c.get("authorId")
    try {

        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id),
                authorId: Number(authorId)
            }
        })
        if (!blog) return c.json({ message: "Blog not found" }, 404)
        const deleteBlog = await prisma.blog.delete({
            where: {
                id: Number(id),
                authorId: Number(c.get("authorId"))
            }
        })

        return c.json({ message: "Blog deleted", blog: blog })
    } catch (error) {
        return c.json({ message: "Error deleting blog" }, 400)
    }
})