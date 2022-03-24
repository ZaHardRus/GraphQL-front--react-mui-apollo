import {gql} from "@apollo/client";

export const getAllDirectors = gql`
        query getAllDirectors($name:String){
             directors(name:$name){
                 id name age movies{
                    id genre name
                 }
             }
        }
    `
export const removeDirector = gql`
        mutation removeDirector($id:ID){
             removeDirector(id:$id){
                id
             }
        }
    `
export const addDirector = gql`
         mutation addDirector($name:String! $age:Int!){
            addDirector(name:$name,age:$age){
                name age id
            }
        }
    `
export const updateDirector = gql`
        mutation updateDirector($id:ID $name:String $age:Int){
             updateDirector(id:$id name:$name age:$age){
                 id name age
             }
        }
    `