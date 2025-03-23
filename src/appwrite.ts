import { Client, Databases, ID, Query } from "appwrite";
import { POSTER_URL } from "./constants/api_constants";
import { Movie } from "./interfaces/Movie";
import { AppwriteDocument } from "./interfaces/Appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const appwrite = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);

const database = new Databases(appwrite);

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal('searchTerm', searchTerm)]);

    if(result.documents.length > 0) {
      const document = result.documents[0];
      
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, document.$id, {
        count: document.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: POSTER_URL(movie.poster_path),
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export const getTrendingMovies = async () => {
  try{
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.limit(5), Query.orderDesc('count')]
    );
    return result.documents as AppwriteDocument[];
  } catch (error) {
    console.log(error);
  }
}