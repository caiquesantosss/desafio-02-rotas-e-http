import { FastifyInstance } from "fastify"
import { z } from "zod"
import { randomUUID } from "node:crypto"
import { knex } from "../database"
import { checkSessionIdAndUser } from "../middleware/check-session-id-and-user"

interface Accumulator {
  bestOnDietSequence: number
  currentSequence: number
}

interface Meal {
  is_on_diet: boolean
}

export async function mealsRoutes(app: FastifyInstance) {
  app.post("/", 
    { preHandler: [checkSessionIdAndUser] }, 
    async (request, reply) => {
    const createMealSchema = z.object({
      name: z.string(),
      description: z.string(),
      isOnDiet: z.boolean(),
      date: z.coerce.date()
    })

    const { name, description, isOnDiet, date } = createMealSchema.parse(request.body)

    await knex("meals").insert({
      id: randomUUID(),
      name,
      description,
      is_on_diet: isOnDiet,
      date: date.getTime(),
      user_id: request.user?.id
    })

    return reply.status(201).send({
      message: "A new meal has been created"
    })
  })

  app.get("/", 
    { preHandler: [checkSessionIdAndUser] }, 
    async (request, reply) => {
    const meals = await knex("meals")
      .where({ user_id: request.user?.id })
      .orderBy("date", "desc")

    return reply.send(meals)
  })

  app.get("/:id", async (request, reply) => {
    const getSpecificMealSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = getSpecificMealSchema.parse(request.params)

    const meal = await knex("meals")
      .where({ id: id })
      .first()

    if (!meal) {
      return reply.status(404).send({
        message: "Meal not found or you never created it"
      })
    }

    reply.send({ meal })
  })

  app.put("/:id", 
    { preHandler: [checkSessionIdAndUser] }, 
    async (request, reply) => {
    const updateSpecificMealSchema = z.object({
      name: z.string(),
      description: z.string(),
      isOnDiet: z.boolean(),
      date: z.coerce.date()
    })

    const getId = z.object({
      id: z.string().uuid()
    })

    const { name, description, isOnDiet, date } = updateSpecificMealSchema
      .parse(request.body)
    const { id } = getId.parse(request.params)

    const newMeal = await knex("meals")
      .where({ id: id })
      .update({
        name,
        description,
        is_on_diet: isOnDiet,
        date: date.getTime()
      })

    if (!newMeal) {
      return reply.status(404).send({
        message: "Meal not found or you never created it"
      })
    }

    reply.status(200).send({
      message: "Meal updated successfully"
    })
  })

  app.delete("/:id", { preHandler: [checkSessionIdAndUser] }, async (request, reply) => {
    const getId = z.object({
      id: z.string().uuid()
    })

    const { id } = getId.parse(request.params)

    const deletedMeal = await knex("meals")
      .where({ id: id })
      .delete()

    if (!deletedMeal) {
      return reply.status(404).send({
        message: "Meal not found"
      })
    }

    reply.status(200).send({
      message: "Meal deleted successfully"
    })
  })

  app.get("/metrics", 
    { preHandler: [checkSessionIdAndUser] }, 
    async (request, reply) => {

      const meals = await knex("meals")
        .where({ user_id: request.user?.id })
        .orderBy("date", "asc")

      const totalMeals = await knex("meals")
        .where({ user_id: request.user?.id })
        .count("id", { as: "total" })
        .first()

      const totalMealsOnDiet = await knex("meals")
        .where({ user_id: request.user?.id, is_on_diet: true })
        .count("id", { as: "total" })
        .first()

      const totalMealsNotOnDiet = await knex("meals")
        .where({ user_id: request.user?.id, is_on_diet: false })
        .count("id", { as: "total" })
        .first()

      const { bestOnDietSequence } = meals.reduce<Accumulator>(
        (acc, meal) => {
          if (meal.is_on_diet) {
            acc.currentSequence += 1
          } else {
            acc.currentSequence = 0
          }

          if (acc.currentSequence > acc.bestOnDietSequence) {
            acc.bestOnDietSequence = acc.currentSequence
          }

          return acc
        },
        { bestOnDietSequence: 0, currentSequence: 0 }
      )

      reply.status(200).send({
        Total_of_meals: totalMeals?.total || 0,
        Total_of_meals_on_diet: totalMealsOnDiet?.total || 0,
        Total_of_meals_not_on_diet: totalMealsNotOnDiet?.total || 0,
        Best_on_diet_sequence: bestOnDietSequence
      })
  })
}
