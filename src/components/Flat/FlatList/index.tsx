import React, { useEffect } from 'react';
import axios from 'axios';
import { useFirestoreCollection, useFirestore } from 'reactfire';
import {
  useHistory,
  useLocation,
  Route,
  useRouteMatch,
  Switch,
} from 'react-router-dom';
import {
  Grid,
  Typography,
  FilledInput,
  InputAdornment,
  IconButton,
  Menu,
} from '@mui/material';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';

import Header from '../../Unknown/Header';
import { FirebaseId, Flat } from '../../../../types';
import FlatItem from '../FlatItem';
import FlatDetails from '../FlatDetails';

const FlatsList: React.FC = () => {
  const history = useHistory();
  const { search } = useLocation();
  const [cities, setCities] = React.useState<any>([]);
  const query = search.slice(13);
  const [city, setCity] = React.useState<string>('Canada' || query);
  const [searchValue, setSearchValue] = React.useState<string>('' || query);
  const match = useRouteMatch();
  const flatsRef = useFirestore()
    .collection('flats')
    // .where('cityName', '==', city)
    .orderBy('publishedAt', 'desc')
    .limit(20);
  const { data } = useFirestoreCollection(flatsRef);

  useEffect(() => {
    if (searchValue) {
      history.push({
        pathname: '/flats',
        search: `/flags?city=${searchValue}`,
      });
    }
  }, [city, history, searchValue]);
  console.log(city);
  useEffect(() => {
    console.log('Effect');
    const fetchData = async () => {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=berlin&types=establishment&key=AIzaSyB1m89Y6fViGcDek7D47ufWMRGJbKDFY5w',
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            dataType: 'jsonp',

            Accept: '*/*',
          },
        },
      );
      console.log(response);
    };
    fetchData();
  }, []);

  // const filtered = cities.filter((item: any) =>
  //   item.name.toLowerCase().includes(searchValue.toLowerCase()),
  // );
  // console.log(flats);
  // console.log(filtered);
  return (
    <>
      <Header />
      <Grid container>
        <Grid
          container
          item
          xs={6}
          sx={{
            position: 'sticky',
            top: 0,
            background: '#fff',
            pt: 3,
          }}
        >
          <FilledInput
            name="city"
            fullWidth
            sx={{ mt: '64px' }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SavedSearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          <Grid>
            {/* {searchValue
              ? filtered.map((item: any) => (
                  <Grid key={item.id} onClick={() => setCity(item.name)}>
                    {item.name}
                  </Grid>
                ))
              : null} */}
          </Grid>
          <Grid item>
            <Typography variant="h4">Flats to rent</Typography>
            {data?.docs?.map((d: any) => (
              <FlatItem key={d.data().address} flat={d.data()} />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Route path={`${match.path}/:id`} component={FlatDetails} />
        </Grid>
      </Grid>
    </>
  );
};

export default FlatsList;
