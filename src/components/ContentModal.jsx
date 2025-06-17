import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


// ContentModal Component
// Shows detailed info about the selected item in a popup modal
const ContentModal = ({ item, onClose }) => {
  if (!item) return null;

  const {
    fullname,
    imageurl,
    contenttype,
    category,
    tags,
    summary,
    url,
  } = item;

  const imageSrc = imageurl || 'https://via.placeholder.com/600x300?text=No+Image';

  return (
    <Dialog
      open={!!item}
      onClose={onClose}
      aria-labelledby="course-title"
      aria-describedby="course-description"
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 10,
          bgcolor: '#fff',
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        aria-label="close"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 10,
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.6)',
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Header Image */}
      <Box
        component="img"
        src={imageSrc}
        alt={fullname}
        sx={{
          width: '100%',
          height: { xs: 200, sm: 300 },
          objectFit: 'cover',
        }}
      />

      {/* Content */}
      <DialogContent sx={{ py: 4, px: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {fullname}
        </Typography>

      {/* CATEGORY */}
      {category?.name && (
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="overline"
            sx={{
              display: 'inline-block',
              backgroundColor: '#E3F2FD',
              color: '#1565c0',
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            {category.name}
          </Typography>
        </Box>
      )}

      {/* TAGS */}
      {tags?.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {tags.map((tag) => (
            <Box
              key={tag.id}
              sx={{
                backgroundColor: '#f1f1f1',
                color: '#555',
                borderRadius: 10,
                px: 1.5,
                py: 0.5,
                fontSize: '0.75rem',
              }}
            >
              #{tag.name}
            </Box>
          ))}
        </Box>
      )}

      {/* Description */}
      <Box>
        <Typography
          variant="body1"
          component="div"
          sx={{ lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{
            __html: summary || '<i>No description available.</i>',
          }}
        />
      </Box>

      {/* CTA Button */}
      {url && (
        <Box mt={4} textAlign="right">
          <Button
            variant="contained"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            size="large"
          >
            View Full Course
          </Button>
        </Box>
      )}
    </DialogContent>
  </Dialog>
  );
};

export default ContentModal;
