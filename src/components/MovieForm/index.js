import {Button, Dialog, Input, MenuItem, Select} from "@mui/material";
import {useMutation, useQuery} from "@apollo/client";
import {useState} from "react";
import {getAllDirectors} from "../../apollo/directors";
import {addMovie, getAllMovies, updateMovie} from "../../apollo/movies";

export const MovieForm = ({
                              dialog,
                              onClose,
                              isUpdate = false,
                              movieId = ''
                          }) => {


    const [name, setName] = useState(dialog?.el?.name)
    const [genre, setGenre] = useState(dialog?.el?.genre)
    const [selectDirector, setSelectDirector] = useState(dialog?.el?.directorId)

    const {
        data: directorsData,
    } = useQuery(getAllDirectors, {variables: {name: ''}})

    const {refetch: refetchMovie} = useQuery(getAllMovies, {variables: {name: ''}})
    const [addHandler] = useMutation(addMovie)
    const [updateHandler] = useMutation(updateMovie)

    const handleChange = (event) => {
        setSelectDirector(event.target.value);
    };

    const addMovieHandler = (e) => {
        e.preventDefault()
        addHandler({variables: {name, genre, directorId: selectDirector}})
            .then(() => refetchMovie({name: ''}))
            .then(() => onClose())
    }
    const updateMovieHandler = (e) => {
        e.preventDefault()
        updateHandler({variables: {id: movieId, name, genre, directorId: selectDirector}})
            .then(() => refetchMovie({name: ''}))
            .then(() => onClose())
    }
    return (
        <Dialog open={!!dialog?.action} onClose={onClose}>
            <button onClick={onClose}>XXX</button>
            <form onSubmit={isUpdate ? updateMovieHandler : addMovieHandler}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Input
                        placeholder={'name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)} name={'name'}/>
                    <Input
                        placeholder={'genre'}
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)} name={'genre'}/>
                    <Select
                        label="Age"
                        placeholder={"director"}
                        value={selectDirector}
                        onChange={handleChange}
                    >
                        {directorsData?.directors.map(el => <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>)}
                    </Select>
                    <Button type={"submit"}>Добавить</Button>
                </div>
            </form>
        </Dialog>
    )
}