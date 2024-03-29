import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
    </CardContent>
  </React.Fragment>
)

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275, height: '75%', p: 0 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  )
}
