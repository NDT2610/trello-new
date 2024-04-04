import * as React from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import Trello from '~/assets/trello.svg'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
export default function NestedList() {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <BackupTableOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Work Space 1" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{}}>
            <ListItemIcon>
              <img src={Trello} className='icon' alt="logo" style={{ fontSize: '16px' }} />
            </ListItemIcon>
            <ListItemText primary="Board" />
          </ListItemButton>
          <ListItemButton sx={{ }}>
            <ListItemIcon>
              <FavoriteBorderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Highlights" />
          </ListItemButton>
          <ListItemButton sx={{}}>
            <ListItemIcon>
              <GridViewOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Image" />
          </ListItemButton>
          <ListItemButton sx={{}}>
            <ListItemIcon>
              <GroupOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Member" />
            <AddOutlinedIcon/>
          </ListItemButton>
          <ListItemButton sx={{}}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}
