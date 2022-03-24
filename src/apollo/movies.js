import {gql} from "@apollo/client";

export const getAllMovies = gql`
        query getAllMovies($name:String){
                movies(name:$name){
    id name watched genre director{
      id name age
    }
  }
        }
    `
export const addMovie = gql`
         mutation addMovie($name:String! $genre:String! $directorId:ID){
            addMovie(name:$name,genre:$genre,directorId:$directorId){
                name genre id director{
                    id name age
                }
            }
        }
    `
export const updateMovie = gql`
        mutation updateMovie($id:ID $name:String $genre:String $directorId:String){
             updateMovie(id:$id name:$name genre:$genre directorId:$directorId){
                 id name genre director {
                    id name age
                 }
             }
        }
    `
export const removeMovie = gql`
        mutation removeMovie($id:ID){
                removeMovie(id:$id){
                    id name genre
                }
        }
    `
export const toggleWatched = gql`
        mutation toggleWatched($id:ID){
                toggleWatched(id:$id){
                    id name genre watched
                }
        }
    `