import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ListCards from './ListCards/ListCards'
import { TextField } from '@mui/material'
import generateUniqueId from '../../../../../api/RandomId'


function Column({ column, onDeleteColumn }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [title, setTitle] = useState(column.title)
  const [editingTitle, setEditingTitle] = useState(false)
  const [newTitle, setNewTitle] = useState(column.title)
  const [orderedCards, setOrderedCard] = useState([])
  const [showCardNameInput, setShowCardNameInput] = useState(false)
  const [newCardName, setNewCardName] = useState('')
  const [cards, setCards] = useState(column.cards)
  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleSaveTitle = () => {
    setTitle(newTitle)
    setEditingTitle(false)
  }

  const handleTitleSubmit = () => {
    column.title = title
    setEditingTitle(false)
  }
  useEffect(() => {
    setOrderedCard(mapOrder(column?.cards, column?.cardOrderIds, '_id'))
  }, [column])

  const handleToggleCardNameInput = () => {
    setShowCardNameInput(!showCardNameInput)
    setNewCardName('')
  }

  const handleSaveCardName = () => {
    if (newCardName.length!== 0) {
      const newCard = {
        _id: generateUniqueId(),
        boardId: column.boardId,
        columnId: column._id,
        title: newCardName,
        description: []
      }
      const updatedCards = Array.isArray(cards)? [...cards, newCard] : [newCard]
      column.cards = updatedCards
      setCards(updatedCards)
      column.cardOrderIds.push(newCard._id)
      setOrderedCard(mapOrder(updatedCards, column.cardOrderIds, '_id'))
      setShowCardNameInput(false)
    } else {
      // eslint-disable-next-line no-console
      console.error('Card name cannot be empty')
    }
  }
  const handleDeleteColumn = () => {
    onDeleteColumn(column._id)
  }


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
          {editingTitle ? (
            <>
              <TextField
                value = { title }
                onChange = { handleTitleChange }
                onBlur = { handleTitleSubmit }
              />
              <Button onClick={handleSaveTitle}>Save</Button>
              <Button onClick={handleDeleteColumn}>Delete</Button>
            </>

          ): (
            <Typography sx={{
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => {setEditingTitle(true), setNewTitle(title)}} >
              {title}
            </Typography>
          )}
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
                <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                <ListItemText >Remove Column</ListItemText>
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
          {showCardNameInput ? (
            <>
              <TextField
                value={newCardName}
                onChange={(e) => setNewCardName(e.target.value)}
                label= 'New Card Name'
                variant='outlined'
                size='small'
                sx={{ flex: 1, mr: 1 }}
              />
              <Button
                onClick={handleSaveCardName }
                sx={{ pl: 2.5, py: 1, display: 'flex', mt: '10px' }}
              >Save</Button>
            </>
          ): (
            <Button onClick={handleToggleCardNameInput}
              startIcon={<AddIcon/>}
              sx={{ color: 'white', pl: 2.5, py: 1 }}
            >
              Add New Card
            </Button>
          )
          }
          <Tooltip title= 'Drag to move'>
            <DragHandleIcon sx={{ cursor: 'pointer' }}/>
          </Tooltip>
        </Box>
      </Box>
    </div>
  )
}

export default Column