import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  chakra,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import api from 'api';
import { ToastMessage } from 'components';
import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaLock } from 'react-icons/fa';

const CFaLock = chakra(FaLock);

const ChangePasswordPage = () => {
  const bgColor = useColorModeValue('primaryGreen', 'primaryOrange');
  // const bgColorHover = useColorModeValue('#0ac19f', '#f7a55c');
  const color = useColorModeValue('white', 'black');
  // const [showChangePassword, setShowChangePassword] = useState(true);
  // const [showPostDocument, setShowPostDocument] = useState(false);
  // const [showListPostLike, setShowListPostLike] = useState(false);
  // const [showListPostReport, setShowListPostReport] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] =
    useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    reset
  } = useForm();

  const newPassword = useRef({});
  newPassword.current = watch('new_password', '');
  const [error, setError] = useState(null);

  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  const onSubmit = async (values: any) => {
    try {
      const response = await api.post('api/auth/change-password', {
        old_password: values.old_password,
        new_password: values.new_password,
        new_password_confirmation: values.confirm_new_password
      });
      if (response.data) {
        notify('success', 'Thay đổi mật khẩu thành công !!');
        reset();
      }
    } catch (error) {
      setError('Has error!!');
      notify('error', 'Thay đổi mật khẩu thất bại !!');
    }
  };

  return (
    <Flex flexDir={'column'} justify="center" align="center" my={'2'}>
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription display="block">{error}</AlertDescription>
            </Box>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setError(null)}
            />
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} p="1rem" boxShadow="md">
            <FormControl isInvalid={errors.old_password}>
              <InputGroup>
                <InputLeftElement pointerEvents={'none'}>
                  <CFaLock color={bgColor} />
                </InputLeftElement>
                <Input
                  type={showOldPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu cũ"
                  {...register('old_password', {
                    required: 'Đây là trường bắt buộc',
                    minLength: {
                      value: 6,
                      message: 'Mật khẩu phải có ít nhất 6 ký tự'
                    },
                    maxLength: {
                      value: 255,
                      message: 'Mật khẩu phải có ít hơn 255 ký tự'
                    }
                  })}
                />
                <InputRightElement>
                  <Button onClick={() => setShowOldPassword(prev => !prev)}>
                    {showOldPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.old_password && errors.old_password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.new_password}>
              <InputGroup>
                <InputLeftElement pointerEvents={'none'}>
                  <CFaLock color={bgColor} />
                </InputLeftElement>
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu mới"
                  {...register('new_password', {
                    required: 'This is required',
                    minLength: {
                      value: 6,
                      message: 'Mật khẩu phải có ít nhất 6 ký tự'
                    },
                    maxLength: {
                      value: 255,
                      message: 'Mật khẩu phải có ít hơn 255 ký tự'
                    }
                  })}
                />
                <InputRightElement>
                  <Button onClick={() => setShowNewPassword(prev => !prev)}>
                    {showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.new_password && errors.new_password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.confirm_new_password}>
              <InputGroup>
                <InputLeftElement pointerEvents={'none'}>
                  <CFaLock color={bgColor} />
                </InputLeftElement>
                <Input
                  type={showNewPasswordConfirmation ? 'text' : 'password'}
                  placeholder="Xác nhận mật khẩu mới"
                  {...register('confirm_new_password', {
                    required: 'Đây là trường bắt buộc',
                    minLength: {
                      value: 6,
                      message: 'Mật khẩu phải có ít nhất 6 ký tự'
                    },
                    maxLength: {
                      value: 255,
                      message: 'Mật khẩu phải có ít hơn 255 ký tự'
                    },
                    validate: value =>
                      value === newPassword.current || 'Mật khẩu không khớp'
                  })}
                />
                <InputRightElement>
                  <Button
                    onClick={() =>
                      setShowNewPasswordConfirmation(prev => !prev)
                    }
                  >
                    {showNewPasswordConfirmation ? (
                      <ViewOffIcon />
                    ) : (
                      <ViewIcon />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.confirm_new_password &&
                  errors.confirm_new_password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              width={'full'}
              borderRadius="0"
              variant={'solid'}
              color={color}
              bgColor={bgColor}
              isLoading={isSubmitting}
            >
              Lưu
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export default ChangePasswordPage;
