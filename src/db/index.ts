import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./schema"
import postgres from "postgres"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"

// Fix for "sorry, too many clients already"
declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase<typeof schema> | undefined
}

let db: PostgresJsDatabase<typeof schema>

// connection URL so drizzle knows where DB lives
const queryClient = postgres(process.env.DB_URL!)
// const db = drizzle(queryClient, { schema })

if (process.env.NODE_ENV === "production") {
  db = drizzle(queryClient, { schema })
} else {
  if (!global.db) global.db = drizzle(queryClient, { schema })

  db = global.db
}

export { db }
