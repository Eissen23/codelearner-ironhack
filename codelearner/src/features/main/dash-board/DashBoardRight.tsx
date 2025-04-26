import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

interface UserInfo {
    email: string;
    name: string;
    accountName: string;
    createdAt: Date;
    about: string;
}

interface DashBoardRightProps {
    userInfo?: UserInfo;
}

const defaultUserInfo: UserInfo = {
    email: 'user@example.com',
    name: 'John Doe',
    accountName: 'johndoe',
    createdAt: new Date('2023-01-01'),
    about: 'Software developer passionate about creating great user experiences.'
};

const DashBoardRight: React.FC<DashBoardRightProps> = ({ userInfo = defaultUserInfo }) => {
    return (
        <Card className="shadow-sm">
            <Card.Body>
                <h4 className="mb-4">User Information</h4>
                <Row className="mb-3">
                    <Col sm={4}>
                        <strong>Name:</strong>
                    </Col>
                    <Col sm={8}>
                        {userInfo.name}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col sm={4}>
                        <strong>Email:</strong>
                    </Col>
                    <Col sm={8}>
                        {userInfo.email}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col sm={4}>
                        <strong>Account Name:</strong>
                    </Col>
                    <Col sm={8}>
                        {userInfo.accountName}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col sm={4}>
                        <strong>Created Date:</strong>
                    </Col>
                    <Col sm={8}>
                        {userInfo.createdAt.toLocaleDateString()}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col sm={4}>
                        <strong>About:</strong>
                    </Col>
                    <Col sm={8}>
                        {userInfo.about}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default DashBoardRight;
