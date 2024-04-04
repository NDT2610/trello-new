import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/material'

function EditColumn({ initialTitle }) {
  const [newTitle, setNewTitle] = useState(initialTitle)

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value)
  }

  return (
    <Box>
      <TextField
        label="Column Title"
        value={newTitle}
        onChange={handleTitleChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
    </Box>
  )
}

export default EditColumn
