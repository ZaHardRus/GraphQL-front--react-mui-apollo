import {DirectorForm} from "../../DirectorForm";
import {Button, TableCell, TableRow} from "@mui/material";

export const DirectorItem = ({dialog, setDialog, onClose, movies, name = '', age = '', id = '', removeItem}) => {

    const openEditor = () => {
        setDialog(prev => ({action: 'update', el: {id, name: name, age: Number(age)}}))
    }
    return (
        <>
            <TableRow key={id}>
                <TableCell component="th" scope="row">{name}</TableCell>
                <TableCell align="right">{age}</TableCell>
                <TableCell>
                    {movies.map((movie, key) => <div key={movie.name}>{`${key + 1}. `}{movie.name}</div>)}
                </TableCell>
                <TableCell align="right">
                    <Button variant='contained' size='small' onClick={openEditor}>Обновить</Button>
                    <Button variant='contained' size='small' onClick={removeItem}>Удалить</Button>
                </TableCell>
            </TableRow>
            {
                dialog?.action === 'update' && dialog.el.id === id &&
                <DirectorForm directorId={id} onClose={onClose} isUpdate dialog={dialog}/>
            }
        </>
    )
}