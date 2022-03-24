import {Button, Dialog, Input} from "@mui/material";
import {useMutation, useQuery} from "@apollo/client";
import {useState} from "react";
import {addDirector, getAllDirectors, updateDirector} from "../../apollo/directors";

export const DirectorForm = ({
                                 dialog,
                                 onClose,
                                 isUpdate = false,
                                 directorId = ''
                             }) => {


    const [name, setName] = useState(dialog?.el?.name)
    const [age, setAge] = useState(dialog?.el?.age)

    const {refetch} = useQuery(getAllDirectors, {variables: {name: ""}})
    const [addHandler] = useMutation(addDirector)
    const [updateHandler] = useMutation(updateDirector)

    const updateDirectorHandler = (e) => {
        e.preventDefault()
        updateHandler({variables: {id: directorId, name, age: +age}})
            .then(() => onClose())
            .then(() => refetch({name: ''}))
    }
    const addDirectorHandler = (e) => {
        e.preventDefault()
        addHandler({variables: {name: name, age: +age}})
            .then(() => onClose())
            .then(() => refetch({name: ''}))
    }
    return (
        <Dialog open={!!dialog?.action} onClose={onClose}>
            <button onClick={onClose}>XXX</button>
            <form onSubmit={isUpdate ? updateDirectorHandler : addDirectorHandler}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)} name={'name'}/>
                    <Input
                        value={age}
                        onChange={(e) => setAge(+e.target.value)} name={'age'}/>
                    <Button type={"submit"}>{isUpdate ? 'Обновить' : 'Добавить'}</Button>
                </div>
            </form>
        </Dialog>
    )
}