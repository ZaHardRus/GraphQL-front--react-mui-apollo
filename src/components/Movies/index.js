import {useMutation, useQuery} from "@apollo/client";
import {MovieItem} from "./MovieItem";
import {Button, Input, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {getAllMovies, removeMovie} from "../../apollo/movies";
import {useState} from "react";

export const Movies = ({dialog, setDialog, onClose}) => {
    const [searchStr,setSearchString] = useState('')
    const {
        loading: moviesLoading,
        data: moviesData,
        error: moviesError,
        refetch
    } = useQuery(getAllMovies, {variables: {name: ''}})
    const [removeHandler] = useMutation(removeMovie)
    const serachMoviesHandler = () => {
        refetch({name:searchStr})
    }


    const removeItem = ({id}) => {
        removeHandler({variables: {id}})
            .then(() => refetch({name: ''}))

    }

    if (moviesLoading) {
        return <h1>Loading...</h1>
    }
    if (moviesError) {
        return <h1>Error...</h1>
    }
    return (
        <Paper elevation={5}>
           <div>
               <Input value={searchStr} onChange={(e)=>setSearchString(e.target.value)} />
               <Button onClick={serachMoviesHandler}>Поиск</Button>
           </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: 700}}>Name</TableCell>
                        <TableCell style={{fontWeight: 700}}>Genre</TableCell>
                        <TableCell style={{fontWeight: 700}}>Director</TableCell>
                        <TableCell style={{fontWeight: 700}}>Watched</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {moviesData?.movies?.map(el => <MovieItem
                        key={el.id}
                        watched={el?.watched}
                        movieId={el?.id}
                        genre={el?.genre}
                        name={el?.name}
                        directorId={el?.director?.id}
                        director={el.director}
                        removeItem={() => removeItem(el)}
                        dialog={dialog}
                        setDialog={setDialog}
                        onClose={onClose}/>)}
                </TableBody>
            </Table>
        </Paper>
    )
}