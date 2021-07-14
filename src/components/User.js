import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Figure } from "react-bootstrap";

const User = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Hello {user.username}!</h1>
      <h2>Dis you?</h2>
      <Figure>
        <Figure.Image
          width={171}
          height={180}
          alt="171x180"
          src={user.avatar_url}
        />
        <Figure.Caption>Your beautiful pic</Figure.Caption>
        <h2>Your name: {user.name}</h2>
      </Figure>
    </div>
  );
};

export default User;
