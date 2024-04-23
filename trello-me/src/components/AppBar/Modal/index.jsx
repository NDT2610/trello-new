import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { TextField } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#2d3436',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
}

function ChildModal({ name, suggest }) {
  const [open, setOpen] = React.useState(false)
  const [newNameBoard, setNewNameBoard] = React.useState('')
  const [descriptionBoard, setDescriptionBoard] = React.useState('')
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const newBoard = {
      title: newNameBoard,
      description: descriptionBoard
    }
    try {
      const response = await fetch('http://localhost:8000/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(newBoard)
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      setOpen(false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching cards:', error)
    }
  }

  return (
    <React.Fragment>
      <Button sx={{ width: '100%', color: 'white', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '20px' }} onClick={handleOpen}>
        <h3>{name}</h3>
        <p style={{ margin: 0, textAlign: 'initial' }}>
          {suggest}
        </p>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, color: 'white', gap: '2', display: 'flex', flexDirection: 'column' }}>
          <h3 id="child-modal-title">{name}</h3>
          <TextField value={newNameBoard} onChange={(e) => setNewNameBoard(e.target.value)} id="outlined-basic" label="Title" variant="outlined" sx={{ }} />
          <TextField value={descriptionBoard} onChange={(e) => setDescriptionBoard(e.target.value)} id="outlined-basic" label="Description" variant="outlined" sx={{ }} />
          <Box>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default function NestedModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" sx={{ height: '32px', width: '100%' }} ><AddIcon></AddIcon></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ height: '100vh' }}
      >
        <Box sx={{ ...style, width: 400, height: 300, borderRadius: '10px' }}>
          <ChildModal
            name = 'Add New Board'
            suggest = 'A table is made up of tags, arranged in a list. Use boards to manage projects, track information, and organize anything' />
          <ChildModal
            name= 'Create New WorkSpace'
            suggest = 'A workspace is a place where tables and people come together. Use the workspace to organize your company, help family and friends '
          />
        </Box>
      </Modal>
    </div>
  )
}
