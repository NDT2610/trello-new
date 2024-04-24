import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import { useEffect, useState } from 'react'

function ListColumns({ columns }) {
  const [columnsState, setColumnsState] = useState([])
  useEffect(() => {
    setColumnsState(column => columns.map((item) => ({ ...item, id: `column_${column.list_id}` })))
  }, [columns])
  const handleDeleteColumn = (columnId) => () => {
    const updatedColumns = columnsState.filter(column => column.list_id !== columnId)
    setColumnsState(updatedColumns)
  }

  return (
    <SortableContext items={columns?.map(c => c.list_id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'auto',
        '&::-webkit-scrollbar-track': {
          m: 2,
          borderRadius: '7px',
          backgroundColor: '#ced0da'
        }
      }}>
        {/* Render existing columns */}
        {columnsState.map((column) => (
          <Column key={column.list_id} column={column} id={`column_${column.list_id}`} onDeleteColumn = {handleDeleteColumn} />
        ))}

        {/* Add column section */}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
