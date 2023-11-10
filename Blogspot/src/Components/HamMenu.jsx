import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

const HamMenu = (props) => {


  return (
    <div>
      <Drawer anchor="right" open={props.open}>
        {/* Content of the drawer goes here */}
        <div className='text-xl text-black'>
           <h1>hello</h1>
        </div>
      </Drawer>
    </div>
  );
};

export default HamMenu;
