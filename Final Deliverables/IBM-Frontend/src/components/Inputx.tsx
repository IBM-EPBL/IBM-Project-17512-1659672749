import { Input, InputProps } from '@chakra-ui/react';

interface IInputx extends InputProps {
  height?: string | number;
  width?: string | number;
}

function Inputx(props: IInputx) {
  const { children, focusBorderColor, ...rest } = props;
  return (
    <Input
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
    </Input>
  );
}

export default Inputx;
