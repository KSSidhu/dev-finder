import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./schema"
import postgres from "postgres"

// connection URL so drizzle knows where DB lives
const queryClient = postgres(process.env.DB_URL!)
const db = drizzle(queryClient, { schema })

export { db }
