import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  FaInfo,
  FaCheck,
  FaExclamationTriangle,
  FaBug,
  FaExclamationCircle
} from 'react-icons/fa';
import { Box } from '@chakra-ui/react';

export const displayIcon = type => {
  switch (type) {
    case 'success':
      return <FaCheck />;
    case 'info':
      return <FaInfo />;
    case 'error':
      return <FaExclamationCircle />;
    case 'warning':
      return <FaExclamationTriangle />;
    default:
      return <FaBug />;
  }
};

const ToastMessage = ({ type, message }) =>
  toast[type](
    <>
      <Box display={'flex'}>
        <Box flexGrow={1} fontSize={15} px={'12px'} py={'8px'}>
          {message}
        </Box>
      </Box>
    </>
  );

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
