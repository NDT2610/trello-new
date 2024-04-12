import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { useState } from 'react'
function TextFieldInput() {
  const [title, setTitle] = useState('Default')
  const [newTitle, setNewTitle] = useState('')
  const [editingTitle, setEditingTitle] = useState(false)

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleSaveTitle = () => {
    updateTitle(newTitle)
    setEditingTitle(false)
  }
  const handleTitleSubmit = () => {
    setEditingTitle(false)
  }
  const updateTitle = (newTitle) => {
    setTitle(newTitle)
  }
  return (
    <div>
      <Box sx={{ p: '0 0 0 30px', cursor: 'pointer' }}>
        <Box sx={{ p: '0 0 20px 20px' }}>
          {editingTitle ? (
            <Box sx={{ display:'flex' }}>
              <TextField
                value = { title }
                onChange = { handleTitleChange }
                onBlur = { handleTitleSubmit }
              />
              <Button onClick={handleSaveTitle}>Save</Button>
            </Box>

          ): (
            <Typography sx={{
            }}
            onClick={() => {setEditingTitle(true), setNewTitle(title)}} >
              {title}
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default TextFieldInput