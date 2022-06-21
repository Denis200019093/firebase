import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useUser } from 'reactfire';

import AuthenticatedLayout from '../AuthenticatedLayout';
import GuestLayout from '../GuestLayout';
import HomeScreen from '../HomeScreen';
import NotFoundScreen from '../NotFoundScreen';
import SignInScreen from '../../Auth/SignInScreen';
import SignUpScreen from '../../Auth/SignUpScreen';
import FlatList from '../../Flat/FlatList';
import FlatDetails from '../../Flat/FlatDetails';

const Root: React.FC = () => {
  const { data: user, firstValuePromise } = useUser();

  const isLogged = !!user;
  const [isUserLoaded, setIsUserLoaded] = React.useState(false);

  useEffect(() => {
    firstValuePromise.then(() => setIsUserLoaded(true));
  }, [firstValuePromise, setIsUserLoaded]);

  // doesn't always work, but suddenly works when subscribing to `firstValuePromise`
  // thus we use `isUserLoaded` below
  // if (!hasEmitted) {
  //   return null;
  // }
  if (!isUserLoaded) {
    return null;
  }

  const routes = {
    path: '/falts',
    component: FlatList,
    childRoutes: [{ path: '/:id', component: FlatDetails }],
  };

  if (isLogged) {
    return (
      <AuthenticatedLayout>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/login" component={() => <Redirect to="/" />} />
          <Route exact path="/register" component={() => <Redirect to="/" />} />
          <Route path="/flats" component={FlatList} />
          <Route path="*" component={NotFoundScreen} />
        </Switch>
      </AuthenticatedLayout>
    );
  }

  return (
    <GuestLayout>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route exact path="/login">
          {isLogged ? <Redirect to="/" /> : <SignInScreen />}
        </Route>
        <Route exact path="/register">
          {isLogged ? <Redirect to="/" /> : <SignUpScreen />}
        </Route>
        <Route exact path="/flats" component={() => <Redirect to="/login" />} />
        <Route path="*" component={NotFoundScreen} />
      </Switch>
    </GuestLayout>
  );
};

export default Root;
