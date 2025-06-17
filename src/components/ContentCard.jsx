import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";


// ContentCard Component
// Represents a single course (image, title, summary)
const ContentCard = ({ item, onClick }) => {
  const imageUrl = item.imageurl || "https://placehold.co/300x150?text=No+Image&font=roboto";

  return (
    <Card
      onClick={onClick}
      sx={{
        height: '100%',
        boxShadow: 3,
        borderRadius: 2,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 6,
          cursor: 'pointer',
        },
      }}
    >
      <CardActionArea sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          height="160"
          image={imageUrl}
          alt={item.fullname}
          sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />
      <CardContent>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          gutterBottom
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.fullname}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {item.summarytext || 'No description available.'}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  );
};

export default ContentCard;
