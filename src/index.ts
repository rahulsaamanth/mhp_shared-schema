import * as schema from "./schema"
import * as relations from "./relations"

export const _db = {
  ...schema,
  ...relations,
}

export * from "./schema"
export * from "./relations"
