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
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ListCards from './ListCards/ListCards'
import { TextField } from '@mui/material'
import { DndContext, closestCenter } from '@dnd-kit/core'
function Column({ column, onDeleteColumn }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [title, setTitle] = useState(column.title)
  const [editingTitle, setEditingTitle] = useState(false)
  const [newTitle, setNewTitle] = useState(column.title)
  const [showCardNameInput, setShowCardNameInput] = useState(false)
  const [newCardName, setNewCardName] = useState('')
  const [cards, setCards] = useState([])
  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleSaveTitle = () => {
    updateColumnTitle(newTitle)
    setEditingTitle(false)
  }

  const handleTitleSubmit = () => {
    setEditingTitle(false)
  }
  const updateColumnTitle = async (newTitle) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
      const response = await fetch(`http://localhost:8000/list/${column.list_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ title: newTitle })
      })
      if (!response.ok) {
        throw new Error('Failed to update column title')
      }
      // Update state with new title
      setTitle(newTitle)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating column title:', error)
    }
  }

  const handleToggleCardNameInput = () => {
    setShowCardNameInput(!showCardNameInput)
    setNewCardName('')
  }
  useEffect(() => {
    const fetchCards = async () => {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken || !column) {
        return
      }
      try {
        const response = await fetch(`http://localhost:8000/card/get/${column.list_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch cards')
        }
        const data = await response.json()
        // Convert the index to text format
        const cardsWithTextIndex = data.map((card, index) => ({
          ...card,
          index: (index + 1).toString() // Convert index to string
        }))
        const test = cardsWithTextIndex.map(item => {
          return { ...item, card_id:  Math.random() * item.card_id }
        })
        setCards(test)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching cards:', error)
      }
    }
    fetchCards()
    return () => {
      // Cleanup function to cancel fetch operation if component unmounts
      // This prevents potential memory leaks
    }
  }, [column])

  const handleSaveCardName = async () => {
    if (newCardName.length !== 0) {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        // eslint-disable-next-line no-console
        console.error('Token not found')
        return
      }
      const newCard = {
        columnId: column.list_id,
        title: newCardName,
        description: 'None'
      }
      try {
        const response = await fetch(`http://localhost:8000/card/${column.list_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify(newCard)
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setCards(prevCards => [...prevCards, data])
        setShowCardNameInput(false)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error creating new column:', error)
      }
    } else {
      // eslint-disable-next-line no-console
      console.error('Card name cannot be empty')
    }
  }
  const handleDeleteColumn = () => {
    onDeleteColumn(column.list_id)
  }


  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event
    if (!over || !active) return

    if (active.id !== over.id) {
      const overIndex = cards.find((card) => card.card_id === over.id).card_id
      const movedCard = cards.find((card) => card.card_id === active.id)
      const overCard = cards.find((card) => card.card_id === over.id)
      const newCards = [...cards]
      const activeIndex = newCards.indexOf(movedCard)
      newCards[activeIndex] = overCard
      newCards[overIndex] = movedCard

      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        return
      }

      try {
        await Promise.all(newCards.map(async (card, index) => {
          // Update the list_id of each column according to the new order
          await fetch(`http://localhost:8000/card/update/${card.card_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ orderCard: index + 1 })// Update the list_id
          })
        }))

        // Update the state with the new column order
        setCards(newCards)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error updating list order:', error)
        // Handle error
      }
    }
  }


  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: column.list_id,
    data: { ...column }
  })

  const columnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%'
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Box
        ref={setNodeRef} style={columnStyle} {...attributes}>
        <Box
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
                fontWeight: 'bold'
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
          <ListCards cards = {cards} />
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
              <DragHandleIcon {...listeners} sx={{ cursor: 'pointer' }}/>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </DndContext>
  )
}

export default Column