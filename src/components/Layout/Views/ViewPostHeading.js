import React from 'react';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function ViewPostHeading(props) {
    
    return (
        <>
            <Col style={{ marginTop: '3%' }} lg={10} md={8} xs={8}>
                <h4>
                    {props.page} <Badge bg="success">{props.type}</Badge>
                </h4>
            </Col>
            <Col style={{ marginTop: '3%', marginBottom: '1%' }} className="d-flex flex-row-reverse" lg={2} md={4} xs={4}>
                <Button onClick={props.onClick} style={{ marginLeft: '3%' }} variant="primary">
                    {props.b_name}
                </Button>
                <Button onClick={() => props.handleGenerateCSV(props.postData)} variant="success">
                    {props.b_name_two}
                </Button>
            </Col>
            <hr />
        </>
    );
}

export default ViewPostHeading;
