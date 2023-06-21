import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {ReactComponent as AppLogo} from "../../assets/lylo-logo.svg"


function LoginPage() {
  return (
    <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}> 
        <Form className='col-md-2 mx-auto text-center'>
            <AppLogo/>
            <h3 className="py-3">Please sign in</h3>
            <Form.Group controlId="formGroupEmail">
                <Form.Control type="email" style={{ borderRadius: 0 }} placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Control type="password" style={{ borderRadius: 0 }} placeholder="Password" />
            </Form.Group>
            <div className='py-3'>
                <Button variant="primary">Sign In</Button>
            </div>
        </Form>
    </div>

  );
}

export default LoginPage;
