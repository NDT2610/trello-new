import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import AppBarProfile from '../../components/AppBarProfile'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextFieldInput from '../../components/TextField'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Cropper from '../../components/Cropper/Cropper'

import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'


function Profile() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const open = Boolean(anchorEl)
  const [profileData, setProfileData] = useState({
    profile_firstName: '',
    profile_lastName: '',
    profile_age: '',
    profile_address: '',
    profile_gender: '',
    profile_phoneNumber: ''
  })

  useEffect(() => {
    // Fetch profile data when component mounts
    const fetchProfileData = async () => {
      const accessToken = localStorage.getItem('accessToken')
      try {
        const response = await fetch('http://localhost:8000/profile/get', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message)
        }
        const data = await response.json()
        setProfileData(data) // Set fetched profile data to state
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching profile:', error)
      }
    }

    fetchProfileData()
  }, [])

  const handleUpdateProfile = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const id = localStorage.getItem('id')
    try {
      const response = await fetch(`http://localhost:8000/profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          firstName: profileData.profile_firstName,
          lastName: profileData.profile_lastName,
          age: profileData.profile_age,
          address: profileData.profile_address,
          gender: profileData.profile_gender,
          phoneNumber: profileData.profile_phoneNumber
        })
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating column title:', error)
    }
  }

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
                <Box sx={{ height: '100%', position: 'absolute', top: '-35px', left: '30px' }}>
                  <Cropper/>
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
                <h4>FisrtName</h4>
                <TextFieldInput
                  label="First Name"
                  value={profileData.profile_firstName}
                  onSave={(value) => setProfileData({ ...profileData, profile_firstName: value })}
                />
                <h4>LastName</h4>
                <TextFieldInput
                  label="Last Name"
                  value={profileData.profile_lastName}
                  onSave={(value) => setProfileData({ ...profileData, profile_lastName: value })}
                />
                <h4>Age</h4>
                <TextFieldInput
                  label="Age"
                  value={profileData.profile_age}
                  onSave={(value) => setProfileData({ ...profileData, profile_age: value })}
                />
                <h4>Gender</h4>
                <TextFieldInput
                  label="Gender"
                  value={profileData.profile_gender}
                  onSave={(value) => setProfileData({ ...profileData, profile_gender: value })}
                />
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
                <h4>Địa chỉ</h4>
                <TextFieldInput
                  label="Address"
                  value={profileData.profile_address}
                  onSave={(value) => setProfileData({ ...profileData, profile_address: value })}
                />
                <h4>Số điện thoai</h4>
                <TextFieldInput
                  label="Phone Number"
                  value={profileData.profile_phoneNumber}
                  onSave={(value) => setProfileData({ ...profileData, profile_phoneNumber: value })}
                />
              </Box>
            </Box>
            <Button sx={{ boxShadow: '0px 1px 1px #091E4240, 0px 0px 1px #091E424F ' }} onClick={handleUpdateProfile}>Save Changes</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Profile