import { Box, useRadio } from '@chakra-ui/react';
import React from 'react';

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="5px"
        border="1px solid #bcaccf"
        _checked={{
          bg: '#bcaccf',
          color: 'black',
          fontWeight: '600',
        }}
        padding="20px"
        margin="10px"
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default RadioCard;
