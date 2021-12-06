import React from 'react';
import { render, screen } from '@testing-library/react';
import InputField from '@components/InputField';
import { Form, Formik } from 'formik';

describe('InputField', () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{ email: '' }} onSubmit={(values) => console.log(values)}>
        <Form>
          <InputField name="email" data-testid="form-input" role="email" placeholder="Email" />
        </Form>
      </Formik>
    );
  });

  it('renders with Formik', () => {
    const email = screen.getByRole('email');
    expect(email).toBeInTheDocument();
  });
});
