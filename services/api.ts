export const TMDB_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  BASE_URL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query?: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data.results;
};


