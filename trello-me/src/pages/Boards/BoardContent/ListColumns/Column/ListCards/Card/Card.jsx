import { Box, Card as MuiCard, TextField } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
function Card({ card }) {
  const [title, setTitle] = useState(card.title)
  const [editingTitle, setEditingTitle] = useState(false)

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleSaveTitle = () => {
    card.title = title
    setEditingTitle(false)
  }


  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: card.card_id,
    data: { ...card }
  })
  const Style = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%'
  }

  return (
    <Box>
      <MuiCard
        sx={{
          maxWidth: 345,
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
          overflow: 'unset'
        }}
        ref={setNodeRef} style={Style} {...attributes}
      >
        {card?.cover &&
          <CardMedia
            sx={{ height: 140 }}
            image= {card?.cover}
          />}
        <CardContent sx={{
          display:  'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'space-between' }}>
          {editingTitle ? (
            <>
              <TextField
                value={ title }
                onChange={handleTitleChange}
                autoFocus
              />
              <Button onClick={handleSaveTitle}>Save</Button>
            </>
          ) : (
            <Typography
              onClick={() => {setEditingTitle(true)}}
            >{title}</Typography>
          )
          }
          <Tooltip title= 'Drag to move' sx={{}}>
            <DragHandleIcon sx={{ cursor: 'pointer' }} {...listeners}/>
          </Tooltip>
        </CardContent>

        {shouldShowCardActions() &&
        <CardActions sx={{ p : '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length &&
          <Button size="small" startIcon={<GroupIcon />}>{card?.memberIds?.length}</Button>
          }
          {!!card?.comments?.length &&
          <Button size="small" startIcon={<ModeCommentIcon />}>{card?.comments.length}</Button>
          }
          {!!card?.attachments?.length &&
          <Button size="small" startIcon={<AttachmentIcon />}>{card?.attachments?.length}</Button>}

        </CardActions>}
      </MuiCard>
    </Box>

  )
}

export default Card