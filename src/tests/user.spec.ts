import {  afterAll, beforeAll, beforeEach, describe, expect, it} from "vitest"
import { app } from "../app"
import { execSync } from "node:child_process"
import request from "supertest"

describe("User route", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        execSync("npm run knex migrate:rollback --all")
        execSync("npm run knex migrate:latest")
    })

    it('should be able to create a new user', async () => {
        const response = await request(app.server)
        .post('/users')
        .send({ name: 'Carlos Teste', email: 'carlos@test.com' })
        .expect(201)

        const cookie = response.get('Set-Cookie')

        expect(cookie).toEqual(
            expect.arrayContaining([expect.stringContaining('sessionId')])
        )
    })  
})
