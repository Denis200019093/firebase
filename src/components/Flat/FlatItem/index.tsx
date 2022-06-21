import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Typography,
  Button,
  CardMedia,
  CardContent,
} from '@mui/material';

import { Flat } from '../../../../types';

interface IProps {
  flat: Flat;
}

const FlatsItem: React.FC<IProps> = ({ flat }) => {
  return (
    <Grid flexDirection="row" container>
      <Grid item xs={6}>
        <CardMedia
          component="img"
          sx={{ width: '100%', height: '100%' }}
          image={flat.photoUrl}
          alt="Live from space album cover"
        />
      </Grid>
      <Grid item xs={6}>
        <CardContent
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Grid item>
            <Typography noWrap variant="h5">
              ${flat.dailyPriceUsd} / night
            </Typography>
            <Typography noWrap variant="body1">
              {flat.address}
            </Typography>
            <Typography
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
              }}
              variant="body2"
            >
              {flat.description}
            </Typography>
          </Grid>
          <Grid item>
            <Button>
              <Link to="flats/123">Details</Link>
            </Button>
          </Grid>
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default FlatsItem;
