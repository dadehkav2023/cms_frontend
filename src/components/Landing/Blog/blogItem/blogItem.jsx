import React from "react";
import { Card } from "react-bootstrap";

import "./blogItem.scss";
const BlogItem = ({ blogPic, blogTitle, blogText }) => {
  return (
    <>
      <Card className="blog-card">
        <Card.Img className="blog-card-img" variant="top" src={blogPic} />
        <Card.Body className="blog-card-body">
          <Card.Title className="blog-text">{blogTitle}</Card.Title>
          <Card.Text className="blog-text" id="blog-text">
            {blogText}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default BlogItem;
