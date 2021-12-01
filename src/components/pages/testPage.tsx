import * as React from "react"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AppBar } from '@mui/material'
import Link from '@mui/material/Link';
import { SearchForm } from '../forms/searchForm';
import { useHistory } from 'react-router-dom'
import { CircleArea, BallSurfaceArea } from './index'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    useRouteMatch
} from "react-router-dom";

function TestNavBar() {
    let { path, url } = useRouteMatch();
    const history = useHistory()
    return (
        <Box
            sx={{
                width: '100%',
                paddingTop: 2,
                marginBottom: 2
            }}>
            <div className="container">
                <AppBar
                    color="transparent"
                    elevation={0}
                    sx={{

                    }}
                    position="static">

                    <Box
                        sx={{
                            display: 'flex',
                            m: 1
                        }}>
                        <Box>
                            <Link sx={{ color: "white" }} href="#" underline="none">
                                <Typography variant="h6" component="div" >
                                    <Box
                                        sx={{
                                            color: '#8591B0'
                                        }}>
                                        Test Page
                                    </Box>

                                </Typography>
                            </Link>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <button onClick={() => { history.push('/testpage/hello') }} className="search-button-2" type="button">Inner Router</button>
                        <button onClick={() => { history.push('/testpage/test') }} className="search-button-2" type="button">Test Route</button>
                        <button className="search-button-2" type="button">Other</button>
                        <button onClick={() => { history.push('/') }} className="search-button-2" type="button">Home</button>
                    </Box>
                </AppBar>
            </div>
            <Box>
                <Typography component="div">
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                        <SearchForm />
                    </Box>
                </Typography>
            </Box>

            <CircleArea />
            <BallSurfaceArea />
        </Box>
    );
}

function Topic() {
    // The <Route> that rendered this component has a
    // path of `/topics/:topicId`. The `:topicId` portion
    // of the URL indicates a placeholder that we can
    // get from `useParams()`.
    let { topicId }: any = useParams();

    return (
        <div>
            <h3>{topicId}</h3>
        </div>
    );
}


export default function TestPage() {
    return (
        <div>
            <TestNavBar />
        </div>
    );
}