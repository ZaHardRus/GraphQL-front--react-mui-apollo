import {useMutation, useQuery} from "@apollo/client";
import {Button, Input, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useState} from "react";
import {DirectorItem} from "./DirectorItem";
import {getAllDirectors, removeDirector} from "../../apollo/directors";

export const Directors = ({dialog, onClose, setDialog}) => {

    const [searchStr, setSearchStr] = useState('')

    const {loading, data, error, refetch} = useQuery(getAllDirectors, {variables: {name: ""}})
    const [removeHandler] = useMutation(removeDirector)


    const removeItem = ({id}) => {
        removeHandler({variables: {id}})
            .then(() => refetch())
    }

    const searchHandler = () => {
        refetch({name: searchStr})
    }

    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>Error...</h1>
    }


    return (
        <>
            <Input value={searchStr} onChange={e => setSearchStr(e.target.value)} type="text"/>
            <Button onClick={searchHandler}>Поиск</Button>
            <Paper elevation={5}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 700}}>Name</TableCell>
                            <TableCell style={{fontWeight: 700}} align="right">Age</TableCell>
                            <TableCell style={{fontWeight: 700}}>Movies</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.directors.map(el => <DirectorItem
                            key={el.id}
                            dialog={dialog}
                            movies={el.movies}
                            setDialog={setDialog}
                            onClose={onClose}
                            removeItem={() => removeItem(el)} {...el}/>)}
                    </TableBody>
                </Table>
            </Paper>
        </>
    )
}