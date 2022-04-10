import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { signIn, getCsrfToken } from 'next-auth/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail);

export default function SignIn({ csrfToken }) {
  const bgColor = useColorModeValue('primaryGreen', 'primaryOrange');
  const router = useRouter();
  const [error, setError] = useState(null);

  const initialValues = {
    email: '',
    password: ''
  };

  const validateSchema = Yup.object({
    email: Yup.string()
      .max(30, 'Must be characters or less')
      .email('invalid email address')
      .required('Please enter your email '),
    passwrod: Yup.string().required('Please enter your password')
  });

  const onSubmit = async (values, { setSubmitting }) => {
    // console.log(values);
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}`
    });

    if (res?.error) {
      setError(res.error);
    } else {
      setError(null);
    }
    if (res.url) router.push(res.url);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={onSubmit}
      >
        {formik => {
          console.log(formik);
          return (
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={4} p="1rem" boxShadow="md">
                <Input
                  type={'hidden'}
                  name="csrfToken"
                  defaultValue={csrfToken}
                />
                <FormControl isInvalid={error !== null}>
                  <InputGroup>
                    <InputLeftElement pointerEvents={'none'}>
                      <CMdEmail color={bgColor} />
                    </InputLeftElement>
                    <Field
                      name="email"
                      aria-label="enter your email"
                      aria-required="true"
                      type="text"
                    />
                    <Input type={'email'} placeholder="Email" />
                  </InputGroup>
                  {error && (
                    <FormErrorMessage>
                      <ErrorMessage name="email" />
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={error !== null}>
                  <InputGroup>
                    <InputLeftElement pointerEvents={'none'}>
                      <CFaLock color={bgColor} />
                    </InputLeftElement>
                    <Field
                      name="password"
                      aria-label="enter your password"
                      aria-required="true"
                      type="password"
                    />
                    <Input type={'password'} placeholder="Password" />
                  </InputGroup>
                  {error && (
                    <FormErrorMessage>
                      <ErrorMessage name="password" />
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Button
                  type="submit"
                  width={'full'}
                  borderRadius="0"
                  variant={'solid'}
                  bgColor={bgColor}
                >
                  {formik.isSubmitting ? 'Please wait...' : 'Login'}
                </Button>
              </Stack>
            </form>
          );
        }}
      </Formik>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  };
}
