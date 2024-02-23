import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
// import WidgetCommonValidator from "../commons/WidgetCommonValidator.jsx";
import {useContext, useState} from "react";
import ComponentMessageValidation from '../../src/libs/components/ComponentMessageValidation.jsx';
import { BASE_URL } from '../../src/libs/config/settings.js';
import { ContextApplication } from '../../src/libs/config/contexts.js';
import useJWT from '../../src/libs/hooks/useJWT.jsx';
import useHTTP from '../../src/libs/hooks/useHTTP.jsx';
import useMessage from '../../src/libs/hooks/useMessage.jsx';
import useChangeListener from '../../src/libs/hooks/useChangeListener.jsx';
import useValidator from '../../src/libs/hooks/useValidator.jsx';

const usersInit = {
  username: "",
  password: ""
}

const usersValidatorInit = {
  username: [],
  password: []
}

const WidgetUsersSignInModal = () => {
  const application = useContext(ContextApplication);
  const jwt = useJWT();
  const http = useHTTP();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [users, setUsers] = useState(usersInit);
  const usersValidator = useValidator(usersValidatorInit);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signIn = () => {
    usersValidator.reset();

    const url = `${BASE_URL}/users/signin/`;

    http.publicHTTP.post(url, users)
      .then((response) => {
        jwt.set(response.data.access);
        application.setIsAuthenticated(true);
        message.success(response)
      })
      .catch((error) => {
        message.error(error);
        usersValidator.except(error)
      });
  }


  return (
    <>
      <Modal
        show={!application.isAuthenticated}
        onHide={handleClose}
        centered={true}
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className={"mb-3"}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name={"username"}
              value={users.username}
              onChange={e => changeListener.onChangeText(e, users, setUsers)}
            />
            <ComponentMessageValidation messages={usersValidator.get('username')} />
          </Form.Group>
          <Form.Group className={"mb-3"}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name={"password"}
              type={"password"}
              value={users.password}
              onChange={e => changeListener.onChangeText(e, user, setUser)}
            />
            <ComponentMessageValidation messages={usersValidator.get('password')} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={signIn}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}

export default WidgetUsersSignInModal;