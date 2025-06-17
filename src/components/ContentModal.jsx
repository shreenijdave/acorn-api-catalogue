// src/components/ContentModal.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ContentModal = ({ item, onClose }) => {
  if (!item) return null;

  const imageUrl = item.imageurl || 'https://via.placeholder.com/600x300?text=No+Image';

  return (
    <Dialog open={!!item} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Custom title with close button */}
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{item.fullname}</Typography>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Image preview */}
      <Box
        component="img"
        src={imageUrl}
        alt={item.fullname}
        sx={{ width: '100%', maxHeight: 300, objectFit: 'cover' }}
      />

      {/* Content description */}
      <DialogContent dividers>
        <Typography variant="subtitle2" gutterBottom>
          Type: {item.contenttype}
        </Typography>
        <DialogContentText>
          <div
            dangerouslySetInnerHTML={{ __html: item.summary || '<i>No additional details.</i>' }}
          />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ContentModal;
