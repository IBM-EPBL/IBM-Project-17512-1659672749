import React from 'react';
import { Textarea, TextareaProps } from '@chakra-ui/react';

interface IProps extends TextareaProps {
  height?: string | number;
  width?: string | number;
}
function TextAreax(props: IProps) {
  const { children, focusBorderColor, ...rest } = props;
  return (
    <Textarea
      {...rest}
      focusBorderColor="#79589f"
      sx={{
        width: props.width ? props.width : '60%',
        margin: '8px',
        '@media screen and (max-width: 700px)': {
          width: '100%',
        },
      }}
    >
      {children}
    </Textarea>
  );
}

export default TextAreax;
