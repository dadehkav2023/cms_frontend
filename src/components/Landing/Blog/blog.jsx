import React from "react";
import Carousel from "react-elastic-carousel";

import "./blog.scss";
import BlogItem from "./blogItem/blogItem";
import blog1 from "../../../assets/img/landing/ordak.jpg";
import blog2 from "../../../assets/img/landing/blog2.jpg";
import blog3 from "../../../assets/img/landing/blog3.jpg";
import blog4 from "../../../assets/img/landing/blog4.jpg";
import blog5 from "../../../assets/img/landing/blog5.jpg";
import blog6 from "../../../assets/img/landing/blog6.jpg";
import blog7 from "../../../assets/img/landing/blog7.jpg";
import blog8 from "../../../assets/img/landing/blog8.jpg";

import SectionTitle from "../../common/SectionTitle/SectionTitle";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Blog() {
  return (
    <section className="blog-section">
      <SectionTitle TitleText="بلاگ" />
      <div className="blog-container">
        <Carousel isRTL breakPoints={breakPoints}>
          <BlogItem
            blogPic={blog1}
            blogTitle="لورم ایپسوم متن"
            blogText="لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد "
          />
          <BlogItem
            blogPic={blog2}
            blogTitle="لورم ایپسوم متن"
            blogText="لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد "
          />
          <BlogItem
            blogPic={blog3}
            blogTitle="لورم ایپسوم متن"
            blogText="لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد "
          />
          <BlogItem
            blogPic={blog4}
            blogTitle="لورم ایپسوم متن"
            blogText="لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد "
          />
          <BlogItem
            blogPic={blog5}
            blogTitle="لورم ایپسوم متن"
            blogText="لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد "
          />
          <BlogItem
            blogPic={blog6}
            blogTitle="لورم ایپسوم متن"
            blogText="لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد "
          />
          <BlogItem
            blogPic={blog7}
            blogTitle="لورم ایپسوم متن"
            blogText="لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد "
          />
          <BlogItem
            blogPic={blog8}
            blogTitle="لورم ایپسوم متن"
            blogText="لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد "
          />
          <BlogItem
            blogPic={blog1}
            blogTitle="لورم ایپسوم متن"
            blogText="لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد "
          />
          <BlogItem
            blogPic={blog2}
            blogTitle="لورم ایپسوم متن"
            blogText="لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد لورم ایپسوم متن ساختگی که هیچ ارزش محتوایی ندارد "
          />
        </Carousel>
      </div>
    </section>
  );
}

export default Blog;
