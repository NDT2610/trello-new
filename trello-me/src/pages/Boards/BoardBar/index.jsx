import { Box } from '@mui/material'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
const MENU_STYLES = {
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover':{
    color: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box px={2} sx={{
      width:'100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      borderTop: '1px solid #00bfa5'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="Rubicon"
          variant="outlined"
          clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          variant="outlined"
          clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          variant="outlined"
          clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automations"
          variant="outlined"
          clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          variant="outlined"
          clickable />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" sx={{ display: 'flex', height: '32px', width: '100%', gap: 2 }} >
          <PersonAddIcon sx={{ fontSize: 'medium' }} />
          Invite
        </Button>
        <AvatarGroup
          max={5}
          sx={{
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16
            }
          }}
        >
          <Avatar
            alt="Tiến Đạt"
            src="https://ca.slack-edge.com/T02MC5CEEPR-U06BLJ0DQC8-27bc4def7ffd-512"
          />
          <Avatar
            alt="Thanh Xuân"
            src="https://ca.slack-edge.com/T02MC5CEEPR-U03F9NR0TPZ-1726ad464fae-512"
          />
          <Avatar
            alt="Quế Anh"
            src="https://ca.slack-edge.com/T02MC5CEEPR-U0510CYT695-2728cba287b3-512"
          />
          <Avatar
            alt="Remy Sharp"
            src="https://ca.slack-edge.com/T02MC5CEEPR-U063Q9DJ734-0180b253dd88-512"
          />
          <Avatar
            alt="Remy Sharp"
            src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
          />
          <Avatar
            alt="Remy Sharp"
            src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
          />
          <Avatar
            alt="Remy Sharp"
            src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
          />
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar