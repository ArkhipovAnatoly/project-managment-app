import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { CardProps } from '../../../types';

export default function ActionAreaCard(props: CardProps) {
  return (
    <Card
      sx={{
        maxWidth: 280,
        padding: '20px',
        objectFit: 'contain',
        backgroundColor: '#353434',
        color: '#eceded',
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="300px" image={props.imgSrc} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2">{props.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
