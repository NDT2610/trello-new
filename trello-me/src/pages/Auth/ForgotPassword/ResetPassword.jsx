import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState } from 'react'

const defaultTheme = createTheme()

export default function ResetPassword() {
  const [error, setError] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const token = data.get('token')
    const password = data.get('password')
    const passwordConfirm = data.get('passwordConfirm')
    try {
      const response = await fetch('http://localhost:8000/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password, passwordConfirm })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
      window.location.href = '/Login'
    } catch (error) {
      // eslint-disable-next-line no-undef
      setError(error.message)
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="token"
                  name="token"
                  required
                  fullWidth
                  id="token"
                  label="Token"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="passwordConfirm"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="passwordConfirm"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Back to Login
                </Link>
              </Grid>
            </Grid>
            <Grid>
              <p style={{ fontSize: '12px', color: 'red' }}>{error}</p>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}