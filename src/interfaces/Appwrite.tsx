import { Models } from "appwrite";

export interface AppwriteDocument extends Models.Document {
  $id: string;
  searchTerm: string;
  count: number;
  movie_id: number;
  poster_url: string;
}