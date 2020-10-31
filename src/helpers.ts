export const extractKeyAlias = (s: string): string => {
  const parts = s.split("|")
  if (parts.length < 4) {
    return ""
  }
  return parts[3]
}
