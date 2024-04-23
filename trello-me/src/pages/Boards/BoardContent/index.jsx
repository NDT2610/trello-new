import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { useEffect, useState } from 'react'
import { parseInt } from 'lodash'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { DndContext, closestCenter } from '@dnd-kit/core'
function BoardContent({ board }) {
  const [showColumnNameInput, setShowColumnNameInput] = useState(false)
  const [newColumnName, setNewColumnName] = useState('')
  const [columns, setColumns] = useState([])
  // eslint-disable-next-line no-console
  console.log(columns)
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
          setColumns(prevColumns => [...prevColumns, data])
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
  const handleDragEnd = async (event) => {
    const { active, over } = event
    if (!over || !active) return

    if (active.id !== over.id) {
      const overIndex = columns.findIndex((column) => column.orderlist === over.id)
      const movedColumn = columns.find((column) => column.orderlist === active.id)
      const overColumn = columns.find((column) => column.orderlist === over.id)
      const newColumns = [...columns]
      const activeIndex = newColumns.indexOf(movedColumn)
      newColumns[activeIndex] = overColumn
      newColumns[overIndex] = movedColumn

      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        return
      }

      try {
        await Promise.all(newColumns.map(async (column, index) => {
          // Update the list_id of each column according to the new order
          await fetch(`http://localhost:8000/list/update/${column.list_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ orderlist: index + 1 })// Update the list_id
          })
        }))

        // Update the state with the new column order
        setColumns(newColumns)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error updating list order:', error)
        // Handle error
      }
    }
  }

  return (
    <DndContext
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
                >Save
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