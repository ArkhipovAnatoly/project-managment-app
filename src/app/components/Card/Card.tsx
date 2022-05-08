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
        color: '#9ca9b3',
        backgroundColor: '#25282c',
        boxShadow: 'rgb(21 23 25 / 64%) 0px 2px 34px;',
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
