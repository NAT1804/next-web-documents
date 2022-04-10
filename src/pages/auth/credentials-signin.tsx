import {
  Button,
  chakra,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { getCsrfToken } from 'next-auth/react';
import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail);

export default function SignIn({ csrfToken }) {
  return (
    <>
      {/* <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Username
          <input name="username" type="text" placeholder="test@email.com" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="pass" />
        </label>
        <button type="submit">Sign in</button>
      </form> */}

      <form>
        <Stack spacing={4} p="1rem" boxShadow="md">
          <Input type={'hidden'} name="csrfToken" defaultValue={csrfToken} />
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents={'none'}>
                <CMdEmail
                  color={useColorModeValue('primaryGreen', 'primaryOrange')}
                />
              </InputLeftElement>
              <Input type={'email'} placeholder="Email" />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents={'none'}>
                <CFaLock
                  color={useColorModeValue('primaryGreen', 'primaryOrange')}
                />
              </InputLeftElement>
              <Input type={'password'} placeholder="Password" />
            </InputGroup>
          </FormControl>
          <Button
            type="submit"
            width={'full'}
            borderRadius="0"
            variant={'solid'}
            bgColor={useColorModeValue('primaryGreen', 'primaryOrange')}
            // onClick={e => e.preventDefault()}
          >
            Login
          </Button>
        </Stack>
      </form>
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
