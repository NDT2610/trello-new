import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Trello from '~/assets/trello.svg'
import Wave from '~/assets/wave.svg'
import FilterIcon from '@mui/icons-material/Filter'

export default function Menu() {
  const [selectedIndex, setSelectedIndex] = React.useState(1)

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360 }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <img src={Trello} className='icon' alt="logo" />
          </ListItemIcon>
          <ListItemText primary="Board" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <FilterIcon/>
          </ListItemIcon>
          <ListItemText primary="Themes" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <img src={Wave} className='icon' alt="logo" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </List>
    </Box>
  )
}
