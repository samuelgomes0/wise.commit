export function validateApiKey(apiKey?: string): boolean {
  if (!apiKey) {
    console.error("❌ API Key is required but was not provided.");
    return false;
  }

  if (apiKey.length < 10) {
    console.error("❌ API Key is too short to be valid.");
    return false;
  }

  return true;
}
