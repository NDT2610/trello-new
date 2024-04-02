import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import { useState } from 'react'

function ListColumns({ columns }) {
  const [columnsState, setColumnsState] = useState(columns)
  const handleDeleteColumn = (columnId) => () => {
    const updatedColumns = columnsState.filter(column => column._id !== columnId)
    setColumnsState(updatedColumns)
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
        {columns.map((column) => (
          <Column key={column._id} column={column} onDeleteColumn = {handleDeleteColumn} />
        ))}

        {/* Add column section */}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
