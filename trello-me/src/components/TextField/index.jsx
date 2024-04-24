import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'

function TextFieldInput({ label, value, onSave }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newValue, setNewValue] = useState(value)

  useEffect(() => {
    if (value.length === 0) {
      setIsEditing(true)
    }
  }, [value])
  const handleSave = () => {
    onSave(newValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setNewValue(value)
    setIsEditing(false)
  }

  return (
    <div>
      <Box sx={{ p: '0 0 0 30px', cursor: 'pointer' }}>
        <Box sx={{ p: '0 0 20px 20px' }}>
          {isEditing ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label={label}
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onBlur={handleSave}
                autoFocus
              />
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Box>
          ) : (
            <Typography
              onClick={() => setIsEditing(true)}
              sx={{ display: 'inline-block', minWidth: '200px' }}
            >
              {value}
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default TextFieldInput
