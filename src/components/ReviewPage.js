import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router";
import { getReviewById, patchReviewLike } from "../utils/ApiReviews";
import { getCommentsById, postComment } from "../utils/ApiComments";
import { Card, Button, Badge } from "react-bootstrap";

const ReviewPage = () => {
  const [review, setReview] = useState({});
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const [commentList, setCommentList] = useState([]);
  const [submit, setSubmit] = useState(true);
  const [newLikes, setNewLikes] = useState(0);
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
          <Button
            style={{ pointerEvents: "none" }}
            variant="primary"
            onClick={() => {
              if (user.username === undefined) {
                alert("WOAH log in first!");
              } else if (newLikes === 0) {
                patchReviewLike(review_id, 1);
                setNewLikes(1);
                setLikes(likes + 1);
              } else if (newLikes > 0) {
                patchReviewLike(review_id, -1);
                setNewLikes(0);
                setLikes(likes - 1);
              }
            }}
            style={{ margin: "5px" }}
          >
            {newLikes === 0 ? "👍" : "👎"}
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
          disabled={user.username ? false : true}
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
