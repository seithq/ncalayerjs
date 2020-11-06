import { extractKeyAlias } from "../helpers"

const testKey =
  "RSA|ТЕСТОВ ТЕСТ|391759e5658dca490117417838e6c72cd8a853e7|b2c70a9ff7a5dc59de0ccc3c0ddde3437cc1f12d"

test("should extract key alias", () => {
  const alias = extractKeyAlias(testKey)
  expect(alias).toBe("b2c70a9ff7a5dc59de0ccc3c0ddde3437cc1f12d")
})

test("should fail on wrong key", () => {
  const alias = extractKeyAlias(
    "RSA|ТЕСТОВ ТЕСТ|391759e5658dca490117417838e6c72cd8a853e7"
  )
  expect(alias).toBe("")
})

test("should fail on empty key", () => {
  const alias = extractKeyAlias("")
  expect(alias).toBe("")
})

test("should extract empty alias", () => {
  const alias = extractKeyAlias(
    "RSA|ТЕСТОВ ТЕСТ|391759e5658dca490117417838e6c72cd8a853e7|"
  )
  expect(alias).toBe("")
})
