import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { statusOptions, typeOptions } from "@/lib/jobs/job-helpers";

// Parsers côté serveur
export const adminJobsParamsParsers = {
  search: parseAsString
    .withDefault("")
    .withOptions({ shallow: false, throttleMs: 1000 }),
  status: parseAsStringEnum([...statusOptions])
    .withDefault("all")
    .withOptions({ shallow: false, throttleMs: 1000 }),
  type: parseAsStringEnum([...typeOptions])
    .withDefault("all")
    .withOptions({ shallow: false, throttleMs: 1000 }),
  page: parseAsInteger.withDefault(0).withOptions({ shallow: false }),
};

// Cache pour le serveur
export const adminJobsParamsCache = createSearchParamsCache(
  adminJobsParamsParsers
);

/* // Parsers côté client (pour useQueryState)
export const adminJobsClientParsers = {
  status: parseAsStringEnum([...statusOptions])
    .withDefault("all")
    .withOptions({
      shallow: false,
    }),
  type: parseAsStringEnum([...typeOptions])
    .withDefault("all")
    .withOptions({
      shallow: false,
    }),
}; */
