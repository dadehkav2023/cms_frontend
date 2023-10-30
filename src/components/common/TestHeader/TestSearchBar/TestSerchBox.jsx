import React from "react";
import { Button, Form, FormControl } from "react-bootstrap";

import search from "../../../../assets/img/landing/icon/Search.png";
import "./TestSearchBox.scss";

const TestSearchBox = () => {
  return (
    <Form className="Search d-flex">
      <FormControl
        type="search"
        placeholder="جستجو ..."
        className="mr-2"
        aria-label="Search"
      />
      <Button>
        <img alt="search" src={search} />
      </Button>
    </Form>
  );
};

export default TestSearchBox;
