import Box from '@mui/material/Box'
import Card from './Card/Card'
function ListCards({ cards }) {


  return (
    <Box sx={{
      p: '0 5px',
      m: '0 5px',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: (theme) => `calc(
            ${theme.trello.boardContentHeight} -
            ${theme.spacing(5)} -
            ${theme.trello.columnFooterHeight} -
            ${theme.trello.columnHeaderHeight}
            )`,
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#ced0da'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#bfc2cf'
      }
    }}>
      {cards?.map(card => (<Card key={card.card_id} card={card} id={`card_${card.list_id}`} />))}
    </Box>
  )
}

export default ListCards