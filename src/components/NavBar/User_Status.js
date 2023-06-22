import React from "react";

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function User_Status() {
    return (
      <ButtonGroup aria-label="Basic example">
      <Button variant="secondary" style={{borderRadius : 0}}>New</Button>
      <Button variant="secondary">Pending</Button>
      <Button variant="secondary">Modified</Button>
      <Button variant="secondary" style={{borderRadius : 0}}>Rejected</Button>
    </ButtonGroup>
    )
}

export default User_Status;