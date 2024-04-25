import { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Cropper from '../../../components/Cropper/Cropper'
import AppBarProfile from '../../../components/AppBarProfile'

function CreateProfile() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    // Handle form submission logic here
    const profile = {
      firstName,
      lastName,
      age,
      phoneNumber,
      address,
      email
    }
    localStorage.setItem('profile', JSON.stringify(profile))
    navigate('/Profile')
  }

  return (
    <Box>
      <AppBarProfile />
      <Box sx={{ width: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Create Profile</h1>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '80%' }}>
          <Box sx={{ display: 'flex', gap: '50px' }}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ width: '40%' }}
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ width: '40%' }}
            />
            <TextField
              label="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              sx={{ width: '20%' }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: '50px' }}>
            <TextField
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box>
            <h3>Avatar</h3>
            <Cropper />
          </Box>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              width: '150px',
              bgcolor: '#3498db',
              color: 'white',
              alignSelf: 'flex-end'
            }}
          >
            Save Profile
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateProfile
