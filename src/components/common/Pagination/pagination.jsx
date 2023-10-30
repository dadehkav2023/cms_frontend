import React from "react";

import "./pagination.scss";
import { Pagination } from "react-bootstrap";
const SharedPagination = () => {
  return (
    <Pagination className="shared-pagination">
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Item active>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
      <Pagination.Item>{4}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item>{12}</Pagination.Item>

      <Pagination.Next />
    </Pagination>
  );
};

export default SharedPagination;
