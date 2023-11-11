import React from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';

import search from '../../../../assets/img/landing/icon/Search.png';
import './TestSearchBox.scss';

const TestSearchBox = () => {
  return (
    <Form className="Search">
      <FormControl
        type="search"
        placeholder="جستجو ..."
        className="mr-2"
        aria-label="Search"
      />
      <button>
        <img alt="search" src={search} width={20} height={20} />
      </button>
    </Form>
  );
};

export default TestSearchBox;
