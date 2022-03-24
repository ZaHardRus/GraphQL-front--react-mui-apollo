import {MovieForm} from "../../MovieForm";
import {Button, Checkbox, TableCell, TableRow} from "@mui/material";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {toggleWatched} from "../../../apollo/movies";

export const MovieItem = ({
                              dialog = {},
                              setDialog,
                              removeItem,
                              onClose,
                              director,
                              movieId = "",
                              directorId = "",
                              watched = false,
                              name = "",
                              genre = ""
                          }) => {

    const openEditor = () => {
        setDialog(prev => ({
            action: 'updateMovie',
            el: {id: movieId, name: name, genre: genre, directorId: directorId}
        }))
    }
    const [watchedStatus, setWatchedStatus] = useState(watched)
    const [toggleHandler] = useMutation(toggleWatched)
    const toggleWatchedHandler = () => {
        toggleHandler({variables: {id: movieId}})
            .then(() => setWatchedStatus(prev => !prev))
    }
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row">{name}</TableCell>
                <TableCell>{genre}</TableCell>
                <TableCell>{director?.name}</TableCell>
                <TableCell> <Checkbox checked={watchedStatus} onChange={toggleWatchedHandler}/></TableCell>
                <TableCell align="right">
                    <>
                        <Button variant='contained' size='small' onClick={openEditor}>Обновить</Button>
                        <Button variant='contained' size='small' onClick={removeItem}>Удалить</Button>
                    </>
                </TableCell>
            </TableRow>
            {
                dialog?.action === 'updateMovie' && dialog.el.id === movieId &&
                <MovieForm dialog={dialog} onClose={onClose} isUpdate={true} directorId={dialog.el.directorId}
                           movieId={movieId}/>
            }
        </>
    )
}