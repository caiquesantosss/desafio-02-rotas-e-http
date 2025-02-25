import fastify from 'fastify'
import { usersRoutes } from './routes/user.route'
import { mealsRoutes } from './routes/meals-routes'
import cookies  from "@fastify/cookie"

export const app = fastify()

app.register(cookies)

app.register(usersRoutes, { prefix: 'users' })
app.register(mealsRoutes, { prefix: 'meals' })
