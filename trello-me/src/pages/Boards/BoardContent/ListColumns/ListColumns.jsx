import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import generateUniqueId from '../../../../api/RandomId'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import Column from './Column/Column'

function ListColumns({ columns, board }) {
  // State for managing the new column name and input visibility
  const [column, setColumns] = useState(columns)
  const [showColumnNameInput, setShowColumnNameInput] = useState(false)
  const [newColumnName, setNewColumnName] = useState('')
  const [allColumns, setAllColumns] = useState([])

  useEffect(() => {
    setAllColumns(columns)
  }, [columns])

  const handleToggleColumnNameInput = () => {
    setShowColumnNameInput(!showColumnNameInput)
    setNewColumnName('')
  }

  const handleAddColumn = () => {
    if (newColumnName.trim() !== '') {
      const newColumn = {
        _id: generateUniqueId(),
        title: newColumnName.trim(),
        cards: [],
        cardOrderIds: [],
        boardId: board.boardId // Using the boardId from the first column
      }

      setAllColumns(prevColumns => [...prevColumns, newColumn])
      setShowColumnNameInput(false)

      // Update the parent component with the new columns
      setColumns(prevColumns => [...prevColumns, newColumn])
    } else {
      console.log('Column name cannot be empty')
    }
  }

  const handleSaveColumnName = () => {
    if (newColumnName.trim() !== '') {
      setAllColumns(prevColumns => [
        ...prevColumns,
        {
          _id: generateUniqueId(),
          title: newColumnName.trim(),
          cards: [],
          cardOrderIds: [],
          boardId: columns[0].boardId // Using the boardId from the first column
        }
      ])

      setShowColumnNameInput(false)

      // Update the parent component with the new columns
      setColumns(prevColumns => [
        ...prevColumns,
        {
          _id: generateUniqueId(),
          title: newColumnName.trim(),
          cards: [],
          cardOrderIds: [],
          boardId: columns[0].boardId // Using the boardId from the first column
        }
      ])
    } else {
      console.log('Column name cannot be empty')
    }
  }

  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': {
          m: 2,
          borderRadius: '7px',
          backgroundColor: '#ced0da'
        }
      }}>
        {/* Render existing columns */}
        {allColumns.map((column) => (
          <Column key={column._id} column={column} />
        ))}

        {/* Add column section */}
        <Box sx={{
          minWidth: '200px',
          maxWidth: '200px',
          mx: 2,
          borderRadius: '6px',
          height: 'fit-content',
          bgcolor: '#ffffff3d',
          display: 'flex',
          alignItems: 'center'
        }}>
          {/* Toggle between input field and button */}
          {showColumnNameInput ? (
            <>
              <TextField
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                label="New Column Name"
                variant="outlined"
                size="small"
                sx={{ flex: 1, mr: 1 }}
              />
              <Button
                onClick={handleSaveColumnName}
                startIcon={<AddIcon />}
                sx={{ color: 'white', pl: 2.5, py: 1 }}
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
    </SortableContext>
  )
}

export default ListColumns
