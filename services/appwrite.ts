import { Account, Client, ID, Query, TablesDB } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;
const SAVED_TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_TABLE_ID!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!) // Your API Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

const tablesDB = new TablesDB(client);
export const account = new Account(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    // check if a record of that search query already exists
    const result = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.equal("searchTerm", query)],
    });

    // if it does, increment the count by 1
    if (result.rows.length > 0) {
      const existingMovie = result.rows[0];

      await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: existingMovie.$id,
        data: { count: existingMovie.count + 1 },
      });
    } else {
      // if it doesn't, create a new record with count = 1
      await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: {
          searchTerm: query,
          count: 1,
          movie_id: movie.id,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      });
    }
  } catch (error) {
    console.log("Appwrite Error:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(5), Query.orderDesc("count")],
    });

    return result.rows as unknown as TrendingMovie[];
  } catch (error) {
    console.log("Appwrite Error:", error);
    return undefined;
  }
};

export const updateEmail = async (newEmail: string, password: string) => {
  try {
    return await account.updateEmail({ email: newEmail, password });
  } catch (error) {
    console.log("Error updating email:", error);
    throw error;
  }
};

export const updatePassword = async (
  newPassword: string,
  oldPassword: string
) => {
  try {
    return await account.updatePassword({ password: newPassword, oldPassword });
  } catch (error) {
    console.log("Error updating password:", error);
    throw error;
  }
};

export const updateName = async (newName: string) => {
  try {
    return await account.updateName({ name: newName });
  } catch (error) {
    console.log("Error updating name:", error);
    throw error;
  }
};

export const getSavedMovies = async (userId: string) => {
  try {
    const result = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: SAVED_TABLE_ID,
      queries: [Query.equal("user_id", userId)],
    });

    return result.rows as unknown as SavedMovie[];
  } catch (error) {
    console.log("Appwrite Error:", error);
    throw error;
  }
};
