
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Button } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import TextFieldEdit from './TextFieldCard/index'
import { useState, useRef } from 'react'

const style = {
  height: '90vh',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
}


export default function BasicModal({ onOpen, onClose }) {
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const inputFileRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const imageUrl = URL.createObjectURL(file)
      setImageUrl(imageUrl)
    }
  }
  const handleUploadClick = () => {
    inputFileRef.current.click()
  }
  return (
    <div>
      <Modal
        open={onOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display:'flex', justifyContent: 'space-between' }}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Text in a modal
            </Typography>
            <Button onClick={onClose}><CloseOutlinedIcon/></Button>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width:'75%' }}>
              <Box>
                <p>Mô Tả</p>
                <TextFieldEdit/>
              </Box>
              <Box>
                <p>Bình Luận</p>
                <TextFieldEdit/>
              </Box>

            </Box>
            <Box sx={{ width:'25%', gap: 2, justifyContent: 'space-between' }}>
              <Box mt={4} sx={{ display:'flex', flexDirection:'column', gap: 2, justifyContent: 'space-between' }} >
                <Button sx={{ width: '80%' }} variant="contained" color="primary" onClick={handleUploadClick}>
                  Invite
                </Button>
                <Button sx={{ width: '80%' }} variant="contained" color="primary" onClick={handleUploadClick}>
                  Label
                </Button>
                <Button sx={{ width: '80%' }} variant="contained" color="primary" onClick={handleUploadClick}>
                  Things to do
                </Button>
                <Button sx={{ width: '80%' }} variant="contained" color="primary" onClick={handleUploadClick}>
                  Deadline
                </Button>
                <Button sx={{ width: '80%' }} variant="contained" color="primary" onClick={handleUploadClick}>
                  Upload File
                </Button>
                <Button sx={{ width: '80%' }} variant="contained" color="primary" onClick={handleUploadClick}>
                  Upload Image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputFileRef}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </Box>

              {imageUrl && (
                <Box mt={4}>
                  <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}