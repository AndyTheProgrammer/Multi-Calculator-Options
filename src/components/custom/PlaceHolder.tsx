import React from 'react'
import { Typography, Box } from '@mui/material'

interface Props {
    placeHolder: string;
}

export default function PlaceHolder(props: Props) {

    const { placeHolder } = props

    return (
        <div>
            <Typography
                sx={{
                    paddingLeft: 1.5,
                    marginBottom: 2,
                    fontFamily: 'Roboto, Helvetica',
                    fontSize: 16
                }}>
                <Box>
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id. Odio euismod lacinia at quis risus sed vulputate odio. */}
                    {placeHolder}
                </Box>
            </Typography>
        </div>
    )
}
