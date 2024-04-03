import React from 'react';
import { ListItem } from './ListItem.js';
import './MainBlock.css';

const response=await fetch("https://api.thecatapi.com/v1/images/search?limit=50&breed_ids=beng&api_key=live_ygAzh3cysTZXmcRR53kBWJtYOS4DwjjD0mA4smj7VARmPc22kdtyJgwcGj4VCkaE");
const data=await response.json();
console.log(data);

export const MainBlock = () => {
  
    const listItems = data.map( item =>
      <ListItem key={item.id} url={item.url} width={item.width} height={item.height} />
    );
  
    return (
        <div className='List'>
          {listItems}
        </div>
    );
  }