import { Box } from '@mui/material'
import AppBar from '../../components/AppBar'


function Workspace() {
  return (
    <Box
      sx={{

      }}>
      <Box>
        <AppBar/>
      </Box>
      <Box sx={{
        osition: 'relative',
        overflowY: 'auto',
        outline: 'none',
        display: 'flex',
        flexDirection: 'Column',
        flexGrow: 1
      }}>
        {/* Menu */}
        <Box sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <nav style={{
            margin: ['40px', 0, 0],
            maxHeight: '90vh',
            padding: [0, '16px'],
            position: 'sticky',
            top: '40px',
            width: '256px',
            display: 'block'
          }}>
            <Box>
              <ul style={{
                listStyleType: 'none'
              }}>
                {/* Board */}
                <li
                >
                  <a href="/" style={{
                    display: 'flex',
                    margin: '4px'
                  }} >
                    <span
                      style={{
                        display: 'block',
                        flex: [0, 0, 'auto'],
                        textAlign: 'center',
                        height: '24px',
                        width:  '24px',
                        color: '#44546f'
                      }}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Board
                      </span>
                    </span>
                  </a>
                </li>
                {/* Themes */}
                <li
                >
                  <a href="/" style={{
                    display: 'flex',
                    margin: '4px'
                  }} >
                    <span
                      style={{
                        display: 'block',
                        flex: [0, 0, 'auto'],
                        textAlign: 'center',
                        height: '24px',
                        width:  '24px',
                        color: '#44546f'
                      }}
                    >
                      <span>
                        Theme
                      </span>
                    </span>
                  </a>
                </li>
                {/* Home */}
                <li
                >
                  <a href="/" style={{
                    display: 'flex',
                    margin: '4px'
                  }} >
                    <span
                      style={{
                        display: 'block',
                        flex: [0, 0, 'auto'],
                        textAlign: 'center',
                        height: '24px',
                        width:  '24px',
                        color: '#44546f'
                      }}
                    >
                      <span>
                        Home
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </Box>
          </nav>
          {/* ALL BOARD */}
          <Box sx={{
            margin: ['40px', '16px', 0],
            maxWidth: '825px',
            minWidth: '288px',
            width: '100%'
          }}>
            {/* header */}
            <Box sx={{
              alignItems: 'flex-start',
              display: 'flex',
              justifyContent: 'space-between',
              margin: [0, 'auto'],
              maxWidth: '850px',
              padding: '32px',
              position: 'relative'
            }}>
              <Box>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}>

                  <Box>
                    <h2>Bảng Ở Đây</h2>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* content */}
            <Box></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Workspace