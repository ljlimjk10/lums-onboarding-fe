
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import { Button } from "react-bootstrap";

function Dashboard_element(props){
    return (
        <>
            <Col lg={props.lg} md={props.md} xs={props.xs} style={{ height: "400px", marginBottom: props.mBottom, marginTop: props.mTop }}>
                <Row style={{marginLeft:"1px"}}>test</Row>
                <div className="d-flex justify-content-center align-items-center h-100">
                    <Button variant="danger" style={{width:"100%", height:"100%"}}>{props.content}</Button>
                </div>
            </Col>
        </>
    )
}

export default Dashboard_element;