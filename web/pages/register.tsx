import { Button } from '@chakra-ui/button';
import { Box, Flex, SimpleGrid, Spacer } from '@chakra-ui/layout';
import { Link as CLink, Text } from '@chakra-ui/react';
import InputField from '@components/InputField';
import Link from 'next/link';
import AuthLayout from '@layout/AuthLayout';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import React from 'react';

const Register: NextPage = () => {
  const additionalLinks = (
    <>
      <Text mt={6} textAlign={['center']}>
        Already have an account?{' '}
        <CLink as="strong" color="brand.600">
          <Link href="/login">
            <a>Login</a>
          </Link>
        </CLink>
      </Text>
      <Text mt={2} textAlign={['center']}>
        Forgot password?{' '}
        <CLink color="brand.600" as="strong">
          <Link href="/forgot-password">Reset password</Link>
        </CLink>
      </Text>
    </>
  );

  const handleOnSubmit = async (values: any, setFieldError: any) => {
    console.log(values);

    if (values.password !== values.confirmPassword) {
      setFieldError('confirmPassword', 'Passwords do not match');
      return;
    }

    // registerMutation.mutate(values, {
    //   onSuccess: () => {
    //     router.push('/login');
    //   },
    //   onError: (error: any) => {
    //     setFieldError(error.response.data.field, error.response.data.message);
    //   },
    // });
  };

  return (
    <AuthLayout additionalLinks={additionalLinks} tabTitle="Register">
      <Formik initialValues={{ username: '', password: '', confirmPassword: '', email: '' }} onSubmit={(values: any, { setFieldError }) => handleOnSubmit(values, setFieldError)}>
        {({ isSubmitting }) => (
          <Form>
            <SimpleGrid columns={1} spacing={6}>
              <Box>
                <InputField name="email" label="Email" data-testid="form-input" role="email" placeholder="Email" />
              </Box>
              <Box>
                <InputField name="username" label="Username" data-testid="form-input" role="username" placeholder="Username" />
              </Box>
              <Box>
                <InputField name="password" role="password" label="Password" data-testid="form-input" placeholder="Password" type="password" />
              </Box>
              <Box>
                <InputField name="confirmPassword" role="confirm-password" label="Confirm Password" data-testid="form-input" placeholder="Confirm Password" type="password" />
              </Box>
              <Flex>
                <Spacer />
                <Button type="submit" isLoading={isSubmitting} role="submit">
                  Register
                </Button>
                <Spacer />
              </Flex>
            </SimpleGrid>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Register;
