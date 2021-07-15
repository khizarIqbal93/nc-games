import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router";
import { getReviewById, patchReviewLike } from "../utils/ApiReviews";
import { getCommentsById, postComment } from "../utils/ApiComments";
import { Card, Button, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";

const ReviewPage = () => {
  const [review, setReview] = useState({});
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const [commentList, setCommentList] = useState([]);
  const [submit, setSubmit] = useState(true);
  const [likes, setLikes] = useState(0);
  let { review_id } = useParams();

  useEffect(() => {
    getReviewById(review_id).then((result) => setReview(result));
  }, [commentList]);

  useEffect(() => {
    setLikes(review.votes);
  }, [review]);

  useEffect(() => {
    getCommentsById(review_id).then((result) => setCommentList(result));
  }, [submit]);

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
          <Card.Text>{review.review_body}</Card.Text>
          <Card.Title>Votes: {likes}</Card.Title>
          <OverlayTrigger
            overlay={
              <Tooltip id="tooltip-disabled">
                {user.username ? "hit me to like" : "sign in first"}
              </Tooltip>
            }
          >
            <Button
              style={{ pointerEvents: "none" }}
              variant="primary"
              onClick={() => {
                if (user.username === undefined) {
                  return "disabled";
                } else {
                  patchReviewLike(review_id, 1);
                  setLikes(likes + 1);
                }
              }}
              style={{ margin: "5px" }}
            >
              👍
            </Button>
          </OverlayTrigger>
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
      <form
        className="comment"
        onSubmit={(event) => {
          event.preventDefault();
          postComment(review_id, user.username, comment, submit, setSubmit);
          setComment("");
        }}
      >
        <input
          className="comment-box"
          type="text"
          placeholder="write a comment"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        ></input>
      </form>
    </div>
  );
};

export default ReviewPage;
