import { knex as setupKex, Knex } from 'knex'
import { env } from './env/index'

export const config: Knex.Config = {
    client: 'sqlite', 
    useNullAsDefault: true,
    connection: {
        filename: env.DATABASE_URL
    },
    migrations: {
        extension: 'ts',
        directory: './database/migrations',
    }
} 

export const knex = setupKex(config)