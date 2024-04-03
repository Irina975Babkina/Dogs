import React from 'react';
import './ListItems.css';


export const ListItem = ( { url, width, height } ) => {
  

  return (
    <div className='ListItem'>
      <span className='Image'><img src ={url} /></span>
      <span className='Text'>width {width}</span>
      <span className='Text'>height {height}</span>
    </div>
  );
};
