import "server-only"

import { MongoClient, type Collection, type Document } from "mongodb"

import { getMongoConfig } from "@/lib/server/inquiry-config"

type MongoGlobal = typeof globalThis & {
  closerIntellectMongoClient?: Promise<MongoClient>
}

const mongoGlobal = globalThis as MongoGlobal

function createClient(): Promise<MongoClient> {
  const { uri } = getMongoConfig()
  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 10_000,
  })

  return client.connect()
}

function getClient(): Promise<MongoClient> {
  if (!mongoGlobal.closerIntellectMongoClient) {
    const connection = createClient()
    mongoGlobal.closerIntellectMongoClient = connection

    void connection.catch(() => {
      if (mongoGlobal.closerIntellectMongoClient === connection) {
        mongoGlobal.closerIntellectMongoClient = undefined
      }
    })
  }

  return mongoGlobal.closerIntellectMongoClient
}

export async function getInquiryCollection<T extends Document>(): Promise<Collection<T>> {
  const [{ database, collection }, client] = await Promise.all([
    Promise.resolve(getMongoConfig()),
    getClient(),
  ])

  return client.db(database).collection<T>(collection)
}

export async function getInquiryRateLimitCollection<T extends Document>(): Promise<Collection<T>> {
  const [{ database, collection }, client] = await Promise.all([
    Promise.resolve(getMongoConfig()),
    getClient(),
  ])

  return client.db(database).collection<T>(`${collection}_rate_limits`)
}
