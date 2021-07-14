import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Form, Button } from "react-bootstrap";
import { getUserByUsername } from "../utils/ApiUsers";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");

  return (
    <div>
      <br></br>
      {user.username ? (
        <div>
          <h3>Ahhh hey {user.username}!</h3>
          <img src={user.avatar_url}></img>
        </div>
      ) : (
        <h1>Who are you, mate?</h1>
      )}
      {user.username ? (
        <h1>Not {user.username}? Enter your username</h1>
      ) : (
        <h1>Log in</h1>
      )}
      <Form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="textareas"
            placeholder="Enter username"
            style={{
              width: "20rem",
              marginLeft: "50rem",
              marginRight: "20rem",
            }}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We believe in no passwords.
          </Form.Text>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            getUserByUsername(username).then((result) => setUser(result));
          }}
        >
          Sign In
        </Button>
      </Form>
    </div>
  );
};

export default Login;
