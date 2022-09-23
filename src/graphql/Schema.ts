import "reflect-metadata";

import PostResolver from "./resolvers/PostResolver.js";
import { PubSub } from "graphql-subscriptions";
import { buildSchema } from "type-graphql";

const pubSub = new PubSub();

export const Schema = async () =>
  await buildSchema({
    emitSchemaFile: "./lib/graphql/schema.gql",
    pubSub: pubSub,
    resolvers: [PostResolver],
    validate: false,
  });
