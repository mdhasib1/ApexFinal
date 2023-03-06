import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const TopAuthorsSection = () => {
  const authors = [
    {
      name: "Author 1",
      sales: 1234,
      profileImageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Author 2",
      sales: 987,
      profileImageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Author 3",
      sales: 456,
      profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Author 3",
      sales: 456,
      profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Author 3",
      sales: 456,
      profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Author 3",
      sales: 456,
      profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Author 3",
      sales: 456,
      profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Author 3",
      sales: 456,
      profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Author 3",
      sales: 456,
      profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Author 3",
      sales: 456,
      profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Author 3",
      sales: 456,
      profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Author 3",
      sales: 456,
      profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Author 3",
      sales: 456,
      profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Author 3",
      sales: 456,
      profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Author 3",
      sales: 456,
      profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Author 3",
      sales: 456,
      profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },

  ];

  return (
    <section className="transparent py-5">
      <Container>
        <h2 className="mb-4 text-light">Top Authors</h2>
        <Row xs={2} md={3} lg={4} className="g-4">
          {authors.map((author) => (
            <Col key={author.name}>
              <div className="d-flex align-items-center">
                <Image
                  src={author.profileImageUrl}
                  roundedCircle
                  width={64}
                  height={64}
                  className="me-3"
                />
                <div>
                  <h5 className="mb-0 text-light">{author.name}</h5>
                  <small className="text-muted">{author.sales} sales</small>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TopAuthorsSection;
