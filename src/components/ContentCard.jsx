// src/components/ContentCard.jsx
import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ContentCard = ({ item, onClick }) => {
  const imageUrl =
    item.imageurl || "https://placehold.co/300x150?text=No+Image&font=roboto";

  return (
    <Card onClick={onClick} sx={{ height: "100%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={item.fullname}
        />
        <CardContent>
          <Typography variant="h6">{item.fullname}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.summarytext || "No description available."}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ContentCard;
