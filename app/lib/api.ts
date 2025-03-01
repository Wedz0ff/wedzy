export function getApiUrl(endpoint: string) {
  const baseUrl =
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` || 'http://localhost:3000';
  return `${baseUrl}${endpoint}`;
}
