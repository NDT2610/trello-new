import React from 'react'
import { Box, Typography } from '@mui/material'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import Trello from '~/assets/trello.svg'
import './styles/index.css'
import Workspace from './Menus/Workspace'
import Recent from './Menus/Recent'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Tooltip from '@mui/material/Tooltip'
import Profile from './Menus/Profile'
import Drawer from '@mui/material/Drawer'
import TemporaryDrawer from './SideBars'
function AppBar() {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }
  return (
    <Box px={2} sx={{
      width:'100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto'
    }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button onClick={toggleDrawer(true)}><AppsIcon sx = {{ color: 'primary.main' }} /></Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <TemporaryDrawer/>
        </Drawer>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: 'primary.main' }}>
          <img src={Trello} className='icon' alt="logo" style={{ color: 'primary.main' }}/>
          <Typography variant='span' sx={{ fontSize: '1rem', fontWeight: 'bold', color: 'primary.main' }}> Trello </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          <Workspace />
          <Recent/>
          <Button variant="outlined" sx={{ height: '32px', width: '100%' }} ><AddIcon></AddIcon></Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id="standard-search"
          label="Search ..."
          type="search"
          variant="outlined"
          size='small'
          sx = {{ minWidth: '120px' }}
        />
        <ModeSelect />
        <Tooltip title = 'Notification'>
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }}/>
          </Badge>
        </Tooltip>
        <Tooltip title= 'Help'>
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main' }}/>
        </Tooltip>
        <Profile/>
      </Box>
    </Box>
  )
}

export default AppBar
