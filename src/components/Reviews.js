import { useEffect, useState } from "react";
import { Card, Button, CardGroup, Badge } from "react-bootstrap";
import { getAllReviews } from "../utils/ApiReviews";
import { getAllCategories } from "../utils/ApiCategories";

const Reviews = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [currCategory, setCurrCategory] = useState("");
  const [reviewsList, setReviewsList] = useState([]);
  useEffect(() => {
    getAllReviews().then((reviews) => setReviewsList(reviews));
    getAllCategories().then((categories) => setCategoryList(categories));
  }, []);

  useEffect(() => {
    if (currCategory === "") {
      getAllReviews().then((reviews) => setReviewsList(reviews));
    } else {
      getAllReviews()
        .then((reviews) =>
          reviews.filter(({ category }) => category === currCategory)
        )
        .then((result) => setReviewsList(result));
    }
  }, [currCategory]);

  return (
    <div>
      <h1>Game reviews</h1>
      <label htmlFor="category">Pick a category:</label>
      <select
        name="category"
        onChange={(event) => setCurrCategory(event.target.value)}
      >
        <option value="">All</option>
        {categoryList.map(({ slug }) => {
          return (
            <option key={slug} value={slug}>
              {slug}
            </option>
          );
        })}
      </select>
      <ul className="reviews-cards">
        <CardGroup id="review-cards">
          {reviewsList.map(
            ({
              review_id,
              title,
              owner,
              category,
              review_img_url,
              created_at,
              votes,
              comment_count,
            }) => {
              return (
                <li key={review_id}>
                  <Card style={{ width: "24rem" }}>
                    <Card.Img
                      variant="top"
                      src={review_img_url}
                      style={{ width: "24rem", height: "200px" }}
                    />
                    <Card.Body>
                      <Card.Title>{title}</Card.Title>
                      <Card.Text id="category-badge">{category}</Card.Text>
                      <Card.Text>By: {owner}</Card.Text>
                      <Card.Text>{created_at}</Card.Text>
                      <Button variant="primary" style={{ margin: "5px" }}>
                        Votes <Badge variant="light">{votes}</Badge>
                        <span className="sr-only"></span>
                      </Button>
                      <Button
                        variant="primary"
                        href={`/reviews/${review_id}`}
                        style={{ margin: "5px" }}
                      >
                        Check me out!
                      </Button>
                    </Card.Body>
                  </Card>
                </li>
              );
            }
          )}
        </CardGroup>
      </ul>
    </div>
  );
};

export default Reviews;
