import { Client } from "../client"

test("should create client", () => {
  const client = new Client("wss://127.0.0.1:13579/")
  expect(client.hasError()).toBe(false)
})

test("should create client with empty url", () => {
  const client = new Client()
  expect(client.hasError()).toBe(false)
})
