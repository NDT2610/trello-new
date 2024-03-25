import Container from '@mui/material/Container'
import BoardContent from './BoardContent'
import AppBar from '../../components/AppBar'
import BoardBar from './BoardBar'
import { mockData } from '~/api/Mock-data'

function Board() {
  return (
    <Container disableGutters maxWidth={false}
      sx = {{ height: '100vh' }}>
      <AppBar/>
      <BoardBar board = {mockData.board} />
      <BoardContent board = {mockData.board}/>
    </Container>
  )
}

export default Board
