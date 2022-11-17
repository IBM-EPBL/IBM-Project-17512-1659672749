import React from 'react';
type ITypo = {
  content: 'h1' | 'h2' | 'h3' | 'h4' | 'subtitle' | 'title' | 'body';
  children: string;
  align?: 'left' | 'right' | 'center' | 'justify';
  height?: string | number;
  width?: string | number;
  color?: string;
  padding?: string | number;
  style?: any;
};

function Typox(props: ITypo) {
  const { children } = props;
  const styles = props.style
    ? props.style
    : {
        width: props.width,
        height: props.height,
        color: props.color,
        padding: props.padding,
        textAlign: props.align,
      };
  switch (props.content) {
    case 'h1':
      return <h1 style={{ ...styles, fontSize: '38px' }}>{children}</h1>;
    case 'h2':
      return <h2 style={{ ...styles, fontSize: '24px' }}>{children}</h2>;
    case 'h3':
      return <h3 style={{ ...styles, fontSize: '18px' }}>{children}</h3>;
    case 'h4':
      return <h4 style={{ ...styles, fontSize: '14px' }}>{children}</h4>;
    case 'subtitle':
      return <h2 style={{ ...styles, fontSize: '18px' }}>{children}</h2>;
    case 'title':
      return <h1 style={{ ...styles, fontSize: '38px' }}>{children}</h1>;
    case 'body':
      return <p style={{ fontSize: '24px', textAlign: props.align }}>{children}</p>;
    default:
      return <p style={{ ...styles, fontSize: '14px' }}>{children}</p>;
  }
}

export default Typox;
