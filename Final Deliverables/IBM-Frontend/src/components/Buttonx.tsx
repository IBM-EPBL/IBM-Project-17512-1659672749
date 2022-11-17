import { Button, ButtonProps } from 'antd';

interface IButtonx extends ButtonProps {
  height?: string | number;
  width?: string | number;
}

function Buttonx(props: IButtonx) {
  const { children, ...rest } = props;
  return (
    <Button
      {...rest}
      style={{
        width: props.width,
        height: props.height,
        backgroundColor: '#79589f',
        color: 'white',
        margin: '10px',
        border: 'none',
        borderRadius: '5px',
      }}
    >
      {children}
    </Button>
  );
}

export default Buttonx;

// BCACCF hovered button

// grey input hover
//  input click  D7CDE2
