import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useAuth } from 'reactfire';
import { Typography, Grid, TextField, Button, Box } from '@mui/material';

import { UIContext } from '../../Unknown/UIContext';
import hero from './hero.jpg';
import validation from './validationScheme';
import { ReactComponent as Logo } from './Vector.svg';
import Input from '../../Input';

interface IInitialValues {
  email: string;
  fullname: string;
  password: string;
  repeatPassword: string;
}

const valuesInputs = {
  email: '',
  fullname: '',
  password: '',
  repeatPassword: '',
};

const SignUpScreen: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const auth = useAuth();

  const handleSignUp = useCallback(
    async (data: IInitialValues) => {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          data.email,
          data.password,
        );
        if (user) {
          await user.updateProfile({
            displayName: data.fullname,
          });
          setAlert({
            show: true,
            severity: 'info',
            message: 'Welcome on board 🚀',
          });
        }
      } catch (e) {
        const result = (e as Error).message;
        if (e instanceof Error) {
          setAlert({
            show: true,
            severity: 'info',
            message: result,
          });
        }
      }
    },
    [setAlert, auth],
  );

  return (
    <>
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container>
          <img src={hero} alt="alt" style={{ height: '100vh', width: '50%' }} />
          <Grid container item xs={6} direction="column" alignItems="center">
            <Grid
              container
              item
              xs={3}
              direction="column"
              alignItems="center"
              justifyContent="space-around"
            >
              <Grid item>
                <Logo />
              </Grid>
              <Grid item>
                <Typography variant="h4">Register</Typography>
              </Grid>
            </Grid>
            <Grid item xs={7}>
              <Grid item xs={12} alignItems="start">
                <Formik
                  initialValues={valuesInputs}
                  validationSchema={validation}
                  onSubmit={handleSignUp}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Grid>
                        <Input
                          id="email"
                          name="email"
                          label="Email"
                          type="email"
                        />
                        <Input
                          id="fullname"
                          name="fullname"
                          label="Fullname"
                          type="text"
                        />
                      </Grid>
                      <Grid item xs={12} alignItems="start">
                        <Input
                          id="password"
                          name="password"
                          label="Password"
                          type="password"
                        />
                        <Input
                          id="repeatPassword"
                          name="repeatPassword"
                          label="Repeat Password"
                          type="password"
                        />
                        <Button
                          disabled={isSubmitting}
                          fullWidth
                          variant="contained"
                          type="submit"
                        >
                          Sign Up
                        </Button>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
            <Grid container item xs={2} direction="column" alignItems="center">
              <Grid item xs={3}>
                <Typography>Don`t have an account?</Typography>
              </Grid>
              <Grid item xs={3}>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignUpScreen;
