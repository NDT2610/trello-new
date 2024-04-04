import Container from '@mui/material/Container'
import BoardContent from './BoardContent'
import AppBar from '../../components/AppBar'
import BoardBar from './BoardBar'
import { useEffect, useState } from 'react'

function Board() {
  const [board, setBoard] = useState([])
  useEffect(() => {
    // Parse the id from localStorage
    const id = parseInt(localStorage.getItem('board_id'))
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      // eslint-disable-next-line no-console
      console.error('Token not found')
      return
    }

    // Fetch workspace data when the component mounts
    fetch(`http://localhost:8000/boards/get/${id}`, { method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then((res) => res.json())
      .then(data => {
        setBoard(data)
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error fetching workspace data:', error)
      })
  }, [])
  return (
    <Container disableGutters maxWidth={false}
      sx = {{ height: '100vh' }}>
      <AppBar/>
      <BoardBar board = {board} />
      <BoardContent board = {board}/>
    </Container>
  )
}

export default Board
