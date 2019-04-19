import React from 'react';
import './Utils.css';

export function Loader(props) {
  return <div className={props.className + ' lds-ripple'}><div></div><div></div></div>;
}