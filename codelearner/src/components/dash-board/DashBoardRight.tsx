import React from "react";
import {
  Row,
  Col,
  Spinner,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import { Form, useOutletContext } from "react-router";
import { useUserDetail } from "../../features/hooks/users/useUserDetail";
import ImageSelector from "../../features/main/ImageSelector";

const DashBoardRight: React.FC = () => {
  const token = useOutletContext() as string | null;
  const userDetail = useUserDetail(token);

  if (!userDetail) {
    return (
      <>
        <h4 className="mb-4">User Information</h4>
        <div
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spinner animation="border" role="status"></Spinner>
        </div>
      </>
    );
  }

  return (
    <>
      <h4 className="mb-4">User Information</h4>

      <Row>
        <Col lg={9} md={6} xs={12}>
          <Form className="p-3 bg-white rounded border-1 border shadow-sm">
            <FormGroup as={Row} className="mb-3 h5" controlId="update">
              <FormLabel column sm={10}>
                Edit info
              </FormLabel>
              <Col sm={2} className="text-end align-content-center">
                <Button size="sm" type="submit" variant="primary">
                  Save Changes
                </Button>
              </Col>
            </FormGroup>
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={2}>
                <strong>Name:</strong>
              </FormLabel>
              <Col sm={10}>
                <FormControl defaultValue={userDetail.full_name} />
              </Col>
            </FormGroup>
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={2}>
                <strong>Email:</strong>
              </FormLabel>
              <Col sm={10}>
                <FormControl readOnly defaultValue={userDetail.email} />
              </Col>
            </FormGroup>
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={2}>
                <strong>Account Name:</strong>
              </FormLabel>
              <Col sm={10}>
                <FormControl defaultValue={userDetail.account_name} />
              </Col>
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>
                <strong>About:</strong>
              </FormLabel>
              <FormControl
                as="textarea"
                rows={3}
                defaultValue={userDetail.about}
              />
            </FormGroup>
          </Form>

          <div className="user_info_noEdit p-3">
            <span>
              <strong>Joined: </strong>
              {new Date(userDetail.created_at).toUTCString()}
            </span>
          </div>
        </Col>

        <Col lg={3} md={6} xs={12}>
          <h5 className="mb-3 pt-3">Avatar</h5>
          <ImageSelector
            defaultImage={userDetail.image_avatar}
            owner_id={userDetail.id.toString()}
            token={token!}
          />
        </Col>
      </Row>
    </>
  );
};

export default DashBoardRight;
