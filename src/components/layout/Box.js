import React from 'react';

const alignProps = ['order', 'justifyContent', 'alignItems', 'alignSelf', 'alignContent']
const sizeProps = ['width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight']
const flexProps = ['flex', 'flexGrow', 'flexShrink', 'flexBasis']
const miscProps = ['fit', 'center', 'wrap', 'column', 'reverse', 'style', 'children'];
const boxProps = [...alignProps, ...sizeProps];
const allProps = [...boxProps, ...miscProps, ...flexProps];

const Box = (props) => {
  const styles = { display: 'flex' };

  if (props.fit) {
    styles.width = '100%';
    styles.height = '100%';
  }

  if (props.center) {
    styles.justifyContent = 'center';
    styles.alignItems = 'center';
  }

  if (props.wrap) {
    styles.flexWrap = 'wrap';
    if (props.wrap === 'reverse') {
      styles.flexWrap += '-reverse';
    }
  }

  if (props.column) {
    styles.flexDirection = 'column'
    if (props.reverse) {
      styles.flexDirection += '-reverse';
    }
  } else {
    if (props.reverse) {
      styles.flexDirection = 'row-reverse';
    }
  }

  boxProps.forEach(prop => {
    if (props.hasOwnProperty(prop)) {
      styles[prop] = props[prop].toString();
    }
  });

  flexProps.forEach(prop => {
    if (props.hasOwnProperty(prop)) {
      styles[prop] = props[prop].toString();
    }
  });

  const childProps = Object.keys(props).reduce((acc, prop) => {
    if (allProps.indexOf(prop) === -1) { acc[prop] = props[prop]; }
    return acc;
  }, {});

  return (
    <div {...childProps} style={{ ...styles, ...props.style }}>
      {props.children}
    </div>
  )
}

export default Box;
