import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default function OutlinedCard({ boards }) {
  const card = (
    <React.Fragment>
      <CardContent sx={{ flex: 'auto', height: '10vh', width:'100%', display: 'flex', bgcolor: '#1abc9c' }}>
        <Typography sx={{ color: '#fff', width: '100%' }} color="text.secondary" gutterBottom>
          {boards?.title}
        </Typography>
      </CardContent>
    </React.Fragment>
  )
  return (
    <Box sx={{ minWidth: '200px', p: 0, borderRadius: '12px' }}>
      <Card variant="outlined" >{card}</Card>
    </Box>
  )
}
