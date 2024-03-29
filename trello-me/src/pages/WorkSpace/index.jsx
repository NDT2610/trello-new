import { Box } from '@mui/material'
import AppBar from '../../components/AppBar'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import OutlinedCard from './Board/index'
import Divider from '@mui/material/Divider'
import NestedList from './List'
import Menu from './Menu'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
function Workspace() {
  return (
    <Box
      sx={{
        height: '100vh'
      }}>
      <Box>
        <AppBar/>
      </Box>
      <Box sx={{
        osition: 'relative',
        overflowY: 'auto',
        outline: 'none',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderTop: '1px solid #00bfa5'
      }}>
        {/* Menu */}
        <Box sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          m: '40px 0 0 ',
          maxHeight: '90vh',
          p: '0 16px',
          position: 'sticky',
          top: '40px',
          width: '256px'
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            borderBottom: '2px ridge',
            width: '100%'
          }}>
            <Menu/>
          </Box>
          <Box>
            <h4>Workspace</h4>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxHeight: '500px',
            overflowX: 'hidden',
            overflowY: 'auto'
          }}>
            <NestedList/>
            <NestedList/>
            <NestedList/>
          </Box>
        </Box>
        {/* ALL BOARD */}
        <Box sx={{
          margin: ['40px', '16px', 0],
          maxWidth: '825px',
          minWidth: '288px',
          width: '100vh'
        }}>
          {/* header */}
          <Box sx={{
            width:'100%',
            alignItems: 'flex-start',
            display: 'flex',
            margin: [0, 'auto'],
            maxWidth: '850px',
            padding: '32px',
            position: 'relative',
            flexDirection: 'column'
          }}>
            <Box>
              <Box sx={{
                width: '70vh',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '2px ridge'
              }}>

                <Box sx={{ p: 2 }}>
                  <h2>Work Space 1
                    <Button type='button'><EditIcon /></Button>
                  </h2>
                </Box>
                <br />
              </Box>
            </Box>
            <Divider sx={{}} />
            <Box sx={{ p: 2, width: '100vh' }}>
              <Box>
                <h3 style={{ }}> <PermIdentityOutlinedIcon/> Your Board</h3>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: ' wrap', gap: 1, flex: 1 }}>
                <OutlinedCard />
                <OutlinedCard />
                <OutlinedCard />
                <OutlinedCard />
                <OutlinedCard />
              </Box>
            </Box>
          </Box>
          {/* content */}
          <Box></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Workspace