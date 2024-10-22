import React from 'react'
import { useState } from 'react';

function ClouserSet() {
    const [isOpen ,setOpen] = useState(false);

  function Open() {
    setOpen(true);
  }
 
  function Close() {
    setOpen(false);
    
  };

  return{Open , Close , isOpen};
}

export default ClouserSet