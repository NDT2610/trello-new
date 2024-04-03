import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { useEffect, useState } from 'react'
import { parseInt } from 'lodash'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
function BoardContent({ board }) {
  const [showColumnNameInput, setShowColumnNameInput] = useState(false)
  const [newColumnName, setNewColumnName] = useState('')
  const [columns, setColumns] = useState([])

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  )
  const handleToggleColumnNameInput = () => {
    setShowColumnNameInput(!showColumnNameInput)
    setNewColumnName('')
  }
  useEffect(() => {
    const board_id = parseInt(localStorage.getItem('board_id'))
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      return
    }

    fetch(`http://localhost:8000/list/${board_id}`, { method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then((res) => res.json())
      .then(data => {
        setColumns(data)
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  }, [])
  const handleSaveColumnName = () => {
    if (newColumnName.length !== 0) {
      const board_id = parseInt(localStorage.getItem('board_id'))
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        // eslint-disable-next-line no-console
        console.error('Token not found')
        return
      }
      const newColumnData = {
        title: newColumnName.trim(),
        board_id: board.board_id
      }
      fetch(`http://localhost:8000/list/${board_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(newColumnData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then(data => {
          // Update the state with the new column
          setColumns(prevColumns => [...prevColumns, data])
          // Update the orderedColumns state with the updated array
          setShowColumnNameInput(false)
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error('Error creating new column:', error)
        })
    } else {
      return
    }
  }
  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.list_id !== over.list_id) {
      const newColumns = [...columns]
      const movedColumn = newColumns.find(column => column.list_id === active.list_id)
      const overIndex = newColumns.findIndex(column => column.list_id === over.list_id)
      newColumns.splice(newColumns.indexOf(movedColumn), 1)
      newColumns.splice(overIndex, 0, movedColumn)

      setColumns(newColumns)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Box sx = {{
        width: '100%',
        overflowX: 'auto  ',
        overflowY: 'auto',
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex',
        p: '10px 0'
      }}>
        <Box sx={{ display: 'flex' }}>
          <ListColumns columns={columns} />
          <Box sx={{
            minWidth: '200px',
            maxWidth: '200px',
            mx: 2,
            borderRadius: '6px'
          }}>
            {/* Toggle between input field and button */}
            {showColumnNameInput ? (
              <>
                <TextField
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  label="New Column Name"
                  size="small"
                  sx={{ flex: 1, mr: 1 }}
                />
                <Button
                  onClick={handleSaveColumnName}
                  startIcon={<AddIcon />}
                  sx={{ color: 'white', pl: 2.5, py: 1, display: 'flex', marginTop: '10px' }}
                  variant="contained"
                >
                      Save
                </Button>
              </>
            ) : (
              <Button
                onClick={handleToggleColumnNameInput}
                startIcon={<AddIcon />}
                sx={{ color: 'white', pl: 2.5, py: 1 }}
                variant="contained"
              >
                    Add Column
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </DndContext>

  )
}

export default BoardContent