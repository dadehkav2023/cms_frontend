import React from "react";
import { Button, Form, FormControl } from "react-bootstrap";

import search from "../../../../assets/img/landing/icon/Search.png";
import "./SearchBox.scss";

const SearchBox = () => {
  return (
    <Form id="Search" className="d-flex">
      <FormControl
        type="search"
        placeholder="جستجو ..."
        className="mr-2 custom-input"
        aria-label="Search"
      />
      <Button className="custom-button">
        <img width={40} height={40} alt="search" src={search} className="custom-image"/>
      </Button>
    </Form>
  );
};

export default SearchBox;
