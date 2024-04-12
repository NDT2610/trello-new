import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import AppBarProfile from '../../components/AppBarProfile'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextFieldInput from '../../components/TextField'
import { useState } from 'react'

import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'


function Profile() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleUploadImage = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      const newImageUrl = e.target.result
      setImageUrl(newImageUrl)
    }

    reader.readAsDataURL(file)
    handleClose() // Close the menu after uploading
  }
  return (
    <Box sx={{ height: '100vh' }}>
      <AppBarProfile />
      <Divider/>
      <Container>
        <Box sx={{ height: 'calc(100vh - 60px)', overflowY: 'auto' }} >
          <Box sx={{ m: '24px' }}>
            <Box sx={{ paddingBottom:  '8px' }}>
              <h2 style={{ position: 'relative', left: '20%' }}>Hồ sơ và chế độ hiển thị</h2>
            </Box>
            <Box sx={{ paddingBottom:  '8px' }}>
              <h3 style={{ position: 'relative', left: '20%' }}>Ảnh hồ sơ và ảnh tiêu đề</h3>
              <Box sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                p: 0,
                width: '50%',
                height: '224px',
                borderRadius: '3px',
                boxShadow: '0px 1px 1px #091E4240, 0px 0px 1px #091E424F ',
                left: '20%'
              }}>
                <Box className='cover_image' sx={{ height: '50%', width: '100%' }}>
                  <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={ imageUrl || 'https://ptc-directory-sited-static.us-east-1.prod.public.atl-paas.net/gradients/5.svg' } alt="" />
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{ position: 'relative', top: '-65%', left: '50%' }}
                    className='profile_image'
                  >
                    <AddPhotoAlternateOutlinedIcon/>
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}
                  >
                    <MenuItem onClick={handleUploadImage}>
                      Upload image
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Delete Image</MenuItem>
                  </Menu>
                </Box>
                <Box sx={{ height: '100%', position: 'absolute' }}>
                  <img style={{ height: '100px', borderRadius: '100%', position: 'relative', top: '60px', left: '50px' }} src={imageUrl || 'https://gominhlong.com/images/products/2021/08/large/ml-219-1.jpg' } alt="" />
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{ position: 'relative', top: '15px', right: '20px' }}
                    className='profile_image'
                  >
                    <AddPhotoAlternateOutlinedIcon/>
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box>
              <h3 style={{ position: 'relative', left: '20%' }}>Giới thiệu bản thân</h3>
              <Box sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 0,
                width: '50%',
                borderRadius: '3px',
                boxShadow: '0px 1px 1px #091E4240, 0px 0px 1px #091E424F ',
                left: '20%',
                padding: '0 0 0 30px  '
              }}>
                <h4>Họ và Tên</h4>
                <TextFieldInput/>
                <h4>Tuổi</h4>
                <TextFieldInput/>
                <h4>Giới Tính</h4>
                <TextFieldInput/>
              </Box>
            </Box>
            <Box>
              <h3 style={{ position: 'relative', left: '20%' }}>Địa chỉ liên hệ</h3>
              <Box sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 0,
                width: '50%',
                borderRadius: '3px',
                boxShadow: '0px 1px 1px #091E4240, 0px 0px 1px #091E424F ',
                left: '20%',
                padding: '0 0 0 30px  '
              }}>
                <h4>Địa chỉ email</h4>
                <TextFieldInput/>
                <h4>Số điện thoai</h4>
                <TextFieldInput/>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Profile