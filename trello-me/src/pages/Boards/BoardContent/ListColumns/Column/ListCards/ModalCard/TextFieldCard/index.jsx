import { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
function TextFieldEdit () {
  const [editingTitle, setEditingTitle] = useState(false)
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (title.length === 0) {
      setEditingTitle(true)
    }
  }, [title])

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleSaveTitle = () => {
    setEditingTitle(false)
  }

  const handleTitleSubmit = () => {
    setEditingTitle(false)
  }
  return (
    <div>
      {editingTitle ? (
        <>
          <TextField
            value = { title }
            onChange = { handleTitleChange }
            onBlur = { handleTitleSubmit }
          />
          <Button onClick={handleSaveTitle}>Save</Button>
        </>

      ): (
        <Typography sx={{
          fontWeight: 'bold'
        }}
        onClick={() => {setEditingTitle(true)}} >
          {title}
        </Typography>
      )}
    </div>
  )
}

export default TextFieldEdit