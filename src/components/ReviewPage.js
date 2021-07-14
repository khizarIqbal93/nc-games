import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getReviewById } from "../utils/ApiReviews";
import { getCommentsById } from "../utils/ApiComments";
import { Card, Button, Badge } from "react-bootstrap";

const ReviewPage = () => {
  const [review, setReview] = useState({});
  const [commentList, setCommentList] = useState([]);
  let { review_id } = useParams();
  useEffect(() => {
    getReviewById(review_id).then((result) => setReview(result));
    getCommentsById(review_id).then((result) => setCommentList(result));
  }, [review_id]);
  return (
    <div>
      <Card>
        <Card.Header as="h5">{review.title}</Card.Header>
        <Card.Body>
          <Card.Img
            variant="top"
            src={review.review_img_url}
            style={{ width: "18rem" }}
          />
          <br></br>
          <Badge pill variant="primary">
            {review.category}
          </Badge>
          <Card.Title>Posted by: {review.owner}</Card.Title>
          <Card.Title>Votes: {review.votes}</Card.Title>
          <Card.Text>{review.review_body}</Card.Text>
          <Button variant="primary" style={{ margin: "5px" }}>
            👍
          </Button>
          <Button variant="primary" style={{ margin: "5px" }}>
            👎
          </Button>
          <Button variant="primary" style={{ margin: "5px" }}>
            comments: {review.comment_count}
          </Button>
        </Card.Body>
      </Card>
      <ul className="comment-list">
        {commentList.map(
          ({ comment_id, body, created_by, votes, created_at }) => {
            return (
              <li key={comment_id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{created_by}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {created_at}
                    </Card.Subtitle>
                    <Card.Text>{body}</Card.Text>
                  </Card.Body>
                </Card>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default ReviewPage;
