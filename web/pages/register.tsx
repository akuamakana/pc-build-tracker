import { Button } from '@chakra-ui/button';
import { Flex, SimpleGrid } from '@chakra-ui/layout';
import { Link as CLink, Text } from '@chakra-ui/react';
import InputField from '@components/InputField';
import AuthLayout from '@layout/AuthLayout';
import { register } from '@lib/api';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { useMutation } from 'react-query';

interface RegisterInputs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const Register: NextPage = () => {
  const useRegisterMutation = useMutation((values: RegisterInputs) => register(values));
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

  const handleOnSubmit = async (values: RegisterInputs, setFieldError: any) => {
    console.log(values);

    if (values.password !== values.confirmPassword) {
      setFieldError('confirmPassword', 'Passwords do not match');
      return;
    }

    useRegisterMutation.mutate(values, {
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
    <AuthLayout additionalLinks={additionalLinks} tabTitle="Register">
      <Formik initialValues={{ username: '', password: '', confirmPassword: '', email: '' }} onSubmit={(values: any, { setFieldError }) => handleOnSubmit(values, setFieldError)}>
        {({ isSubmitting }) => (
          <Form>
            <SimpleGrid columns={1} spacing={6}>
              <InputField name="email" label="Email" data-testid="form-input" role="email" placeholder="Email" />
              <InputField name="username" label="Username" data-testid="form-input" role="username" placeholder="Username" />
              <InputField name="password" role="password" label="Password" data-testid="form-input" placeholder="Password" type="password" />
              <InputField name="confirmPassword" role="confirm-password" label="Confirm Password" data-testid="form-input" placeholder="Confirm Password" type="password" />
              <Flex justifyContent={'center'} alignItems={'center'}>
                <Button type="submit" isLoading={isSubmitting} role="submit">
                  Register
                </Button>
              </Flex>
            </SimpleGrid>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Register;
