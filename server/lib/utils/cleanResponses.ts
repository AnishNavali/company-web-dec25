export function cleanResponse(text: string): string {
  return text
    .replace(/\*/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
