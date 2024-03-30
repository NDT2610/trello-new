import { useState } from 'react'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import generateUniqueId from '../../../../api/RandomId'

function ListColumns({ columns }) {
  const [newColumnName, setNewColumnName] = useState('')
  const [allColumns, setAllColumns] = useState(columns)

  const handleAddColumn = () => {
    const newColumn = {
      _id: generateUniqueId(),
      title: newColumnName,
      cards: [],
      cardOrderIds: []
    }

    setAllColumns([...allColumns, newColumn])
    setNewColumnName('')
  }

  return (
    <SortableContext items={allColumns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
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
        {allColumns?.map((column) => {
          return <Column key={column._id} column={column} />
        })}

        {/* Add column button */}
        <Box sx={{
          minWidth: '200px',
          maxWidth: '200px',
          mx: 2,
          borderRadius: '6px',
          height: 'fit-content',
          bgcolor: '#ffffff3d'
        }}>
          <Button
            startIcon={<AddIcon />}
            sx={{
              color: 'white',
              width: '100%',
              justifyContent: 'flex-start',
              pl: 2.5,
              py: 1
            }}
            variant="contained"
            onClick={handleAddColumn}
          >
            Add column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
