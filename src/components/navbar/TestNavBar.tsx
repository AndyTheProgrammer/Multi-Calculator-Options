import * as React from "react"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { AppBar } from '@mui/material'
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import {
  useParams,
  useRouteMatch,
  useHistory
} from "react-router-dom"

import { SearchForm } from '../forms/searchForm';
import { Font, FontProvider } from '../font'

const TestNavBar = () => {
  let { path, url } = useRouteMatch();
  const history = useHistory()
  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: 2,
        marginBottom: 2,
      }}>
      <Container>
        <AppBar
          color="transparent"
          elevation={0}
          position="static"
          style={{ backgroundColor: 'transparent' }}
        >
          {/* Provide font here */}
          <FontProvider fonts={[{ font: 'Fira Sans' }]}>
            <Box
              sx={{
                display: 'flex',
                m: 1,
              }}
            >
              <Box>
                <Link sx={{ color: "white" }} href="#" underline="none">
                  <Typography variant="h6" component="div">
                    <Box
                      sx={{
                        color: '#8591B0'
                      }}
                    >
                      <Font>Test Page</Font>
                    </Box>

                  </Typography>
                </Link>
              </Box>
              <Box sx={{ flexGrow: 1 }}></Box>
              {/* <button
                onClick={() => { history.push('/testpage/hello') }} className="search-button-2"
                type="button"
              >
                <Font>Inner Router</Font>
              </button>
              <button
                onClick={() => { history.push('/testpage/test') }} className="search-button-2"
                type="button"
              >
                <Font>Test Route</Font>
              </button> */}

              <button
                className="search-button-2"
                type="button"
                onClick={() => history.push('/testpage')}
              >
                <Font>Area</Font>
              </button>
              <button
                className="search-button-2"
                type="button"
                onClick={() => history.push('/finance')}
              >
                <Font>Finance</Font>
              </button>
              <button
                className="search-button-2"
                type="button"
                onClick={() => history.push('/fitness&healthpage')}
              >
                <Font>Health</Font>
              </button>
              <button
                className="search-button-2"
                type="button"
                onClick={() => history.push('/other')}
              >
                <Font>Other</Font>
              </button>
              <button
                className="search-button-2"
                type="button"
                onClick={() => history.push('/statistics')}
              >
                <Font>Statistics</Font>
              </button>
              <button
                className="search-button-2"
                type="button"
                onClick={() => history.push('/surfaceArea')}
              >
                <Font>Surface Area</Font>
              </button>
              <button
                className="search-button-2"
                type="button"
                onClick={() => history.push('/volume')}
              >
                <Font>Volume</Font>
              </button>
              <button
                onClick={() => { history.push('/') }}
                className="search-button-2"
                type="button"
              >
                <Font>Home</Font>
              </button>
            </Box>
          </FontProvider>
        </AppBar>
      </Container>

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
    </Box>
  );
}

export default TestNavBar
