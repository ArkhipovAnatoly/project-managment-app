import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, useTheme } from '@mui/material';
import { CardProps } from '../../../types';

export default function ActionAreaCard({ name, imgSrc, description }: CardProps) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        maxWidth: 280,
        padding: '20px',
        objectFit: 'contain',
        color: '#9ca9b3',
        bgcolor: theme.palette.mode === 'dark' ? '#25282c' : 'common.white',
        boxShadow: 'rgb(21 23 25 / 64%) 0px 2px 34px;',
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="300" image={imgSrc} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
