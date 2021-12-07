import { Button } from '@chakra-ui/button';
import { Flex, SimpleGrid } from '@chakra-ui/layout';
import { Link as CLink, Text } from '@chakra-ui/react';
import InputField from '@components/InputField';
import AuthLayout from '@layout/AuthLayout';
import { login } from '@lib/api';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { useMutation } from 'react-query';

interface LoginInputs {
  password: string;
  usernameOrEmail: string;
}

const Login: NextPage = () => {
  const useLoginMutation = useMutation((values: LoginInputs) => login(values));
  const additionalLinks = (
    <>
      <Text mt={6} textAlign={['center']}>
        Already have an account?{' '}
        <CLink as="strong" color="brand.500" role="register">
          <Link href="/register">Register</Link>
        </CLink>
      </Text>
      <Text mt={2} textAlign={['center']}>
        Forgot password?{' '}
        <CLink as="strong" color="brand.500" role="reset-password">
          <Link href="/forgot-password">Reset password</Link>
        </CLink>
      </Text>
    </>
  );

  const handleOnSubmit = async (values: LoginInputs, setFieldError: Function) => {
    console.log(values);

    useLoginMutation.mutate(values, {
      onSuccess: () => {
        // router.push('/login');
        console.log('Success');
      },
      onError: (error: any) => {
        setFieldError(error.response.data.field, error.response.data.message);
      },
    });
  };

  return (
    <AuthLayout additionalLinks={additionalLinks} tabTitle="Login">
      <Formik initialValues={{ usernameOrEmail: '', password: '' }} onSubmit={(values: LoginInputs, { setFieldError }) => handleOnSubmit(values, setFieldError)}>
        {({ isSubmitting }) => (
          <Form>
            <SimpleGrid columns={1} spacing={6}>
              <InputField name="usernameOrEmail" label="Username or Email" data-testid="form-input" role="usernameOrEmail" placeholder="Username or Email" />
              <InputField name="password" role="password" label="Password" data-testid="form-input" placeholder="Password" type="password" />
              <Flex justifyContent={'center'} alignItems={'center'}>
                <Button type="submit" isLoading={isSubmitting} role="submit">
                  Login
                </Button>
              </Flex>
            </SimpleGrid>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;
