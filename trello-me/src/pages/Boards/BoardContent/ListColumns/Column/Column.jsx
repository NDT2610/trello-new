
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import { mapOrder } from '~/utils/sorts'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { useState } from 'react'
import Box from '@mui/material/Box'
import ListCards from './ListCards/ListCards'


function Column({ column }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }


  const {
    attributes, listeners, setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 :undefined
  }

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth:'300px',
          ml: 2,
          borderRadius: '6px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#95afc0'),
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>

        {/* {Column header} */}
        <Box sx = {{
          height: (theme) => {theme.trello.columnHeaderHeight},
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography sx={{
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            {column.title}
          </Typography>
          <Box>
            <Tooltip title= 'More Option'>
              <ExpandMoreIcon
                sx ={{ color: 'text.primary', cursor: 'pointer' }}
                id="basic-button-workspace"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-menu-column-dropdown'
              }}
            >
              <MenuItem>
                <ListItemIcon><AddIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Add New Card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Archive this Column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Remove Column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* {Column body} */}
        <ListCards cards = {orderedCards}/>
        {/* {Column footer} */}
        <Box sx={{
          height: (theme) => {theme.trello.columnFooterHeight},
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Button startIcon={<AddIcon/>}>Add New Card</Button>
          <Tooltip title= 'Drag to move'>
            <DragHandleIcon sx={{ cursor: 'pointer' }}/>
          </Tooltip>
        </Box>
      </Box>
    </div>
  )
}

export default Column