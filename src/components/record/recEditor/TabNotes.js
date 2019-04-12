import React from "react";

import { FormGroup, Label, Col, Button, Input } from "reactstrap";

export default function TabNotes() {
  return (
    <div>
      <h1 className="h3 display text-primary text-center">Notes</h1>
      <Col>
        <FormGroup>
          <Label>Notes:</Label>
          <Input
            // onChange={changeVal}
            // onBlur={sendVal}
            // // name={custom_field_id}
            type="textarea"
            // value={inputVal}
            placeholder="Enter Text"
            // maxLength={length === 0 ? "" : length}
          />
        </FormGroup>
        <FormGroup>
          <Button className="btn btn-primary">Save</Button>
        </FormGroup>
      </Col>
    </div>
  );
}
