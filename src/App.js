import './App.css';
import {Box, IconButton, Tab} from "@mui/material";
import {useState} from "react";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Directors} from "./components/Directors";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Movies} from "./components/Movies";
import {DirectorForm} from "./components/DirectorForm";
import {MovieForm} from './components/MovieForm'


function App() {
    const [value, setValue] = useState('1');
    let [dialog, setDialog] = useState({
        action: null,
        el: {
            name: '',
            age: ''
        }
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const dialogAddDirector = () => {
        setDialog(prev => ({...prev, action: 'addDirector'}))
    }
    const dialogAddMovie = () => {
        setDialog(prev => ({action: 'addMovie', el: {name: '', genre: '', directorId: ''}}))
    }
    const onClose = () => {
        setDialog(prev => ({action: null, el: {name: '', age: ''}}))
    }

    return (
        <div className="App">
            <Box sx={{width: '100%', typography: 'body1'}}>
                <TabContext value={value}>
                    <Box md={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} variant="fullWidth">
                            <Tab label="Directors" value="1"/>
                            <Tab label="Movies" value="2"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Directors dialog={dialog} setDialog={setDialog} onClose={onClose}/>
                        <IconButton onClick={dialogAddDirector}>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                        {dialog.action === 'addDirector' && <DirectorForm dialog={dialog} onClose={onClose}/>}
                    </TabPanel>
                    <TabPanel value="2">
                        <Movies dialog={dialog} setDialog={setDialog} onClose={onClose}/>
                        <IconButton onClick={dialogAddMovie}>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                        {dialog.action === 'addMovie' && <MovieForm dialog={dialog} onClose={onClose}/>}
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
}

export default App;
