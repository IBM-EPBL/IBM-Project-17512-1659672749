import { Card, CardProps } from 'antd';
import React from 'react';
interface ICardx extends CardProps {
  height?: string | number;
  width?: string | number;
}

function Cardx(props: ICardx) {
  const { children, style, ...rest } = props;
  return (
    <Card
      {...rest}
      style={{
        width: props.width,
        height: props.height,
        boxShadow: '2px 2px 10px 2px #bcaccf',
        margin: '40px 10px',
        ...style,
      }}
    >
      {children}
    </Card>
  );
}

export default Cardx;
