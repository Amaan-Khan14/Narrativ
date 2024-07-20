import { Hono } from 'hono'
import { userRouter } from '../routes/user';
import { blogrouter } from '../routes/blog';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()

app.use('/*', cors()),

  app.get('/', (c) => {
    return c.text('Amaan! This side')
  })

app.route('/user', userRouter)
app.route('/blog', blogrouter)

export default app
