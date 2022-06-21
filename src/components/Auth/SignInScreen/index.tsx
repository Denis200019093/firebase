import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useAuth } from 'reactfire';
import { Typography, Grid, Button, Box } from '@mui/material';

import { UIContext } from '../../Unknown/UIContext';
import { ReactComponent as Logo } from './Vector.svg';
import hero from './hero.jpg';
import validation from './validationScheme';
import Input from '../../Input';

interface IInitialValues {
  email: string;
  password: string;
}

const valuesInputs = {
  email: '',
  password: '',
};

const SignInScreen: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const auth = useAuth();

  const handleSignIn = useCallback(
    async (data: IInitialValues) => {
      try {
        await auth.signInWithEmailAndPassword(data.email, data.password);
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
                <Typography variant="h4">Login</Typography>
              </Grid>
            </Grid>
            <Grid item xs={7}>
              <Grid item xs={12} alignItems="start">
                <Formik
                  initialValues={valuesInputs}
                  validationSchema={validation}
                  onSubmit={handleSignIn}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Input
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                      />
                      <Input
                        id="password"
                        label="Passwrod"
                        name="password"
                        type="password"
                      />
                      <Button
                        disabled={isSubmitting}
                        fullWidth
                        variant="contained"
                        type="submit"
                      >
                        Login
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
            <Grid container item xs={2} direction="column" alignItems="center">
              <Grid item xs={3}>
                <Typography>Already have account?</Typography>
              </Grid>
              <Grid item xs={3}>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignInScreen;
