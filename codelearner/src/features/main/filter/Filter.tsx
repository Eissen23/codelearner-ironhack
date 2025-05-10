import React, { useState, useEffect, FormEvent } from "react";
import { Form, Button, Offcanvas } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import * as qs from "qs";
import { FaFilter } from "react-icons/fa";

interface Filters {
  perPage: string;
  name: string;
  sort: string;
}

const Filter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Parse initial query parameters from URL
  const queryParams = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }) as Partial<Filters>;

  // State for filters
  const [filters, setFilters] = useState<Filters>({
    perPage: queryParams.perPage || "10",
    name: queryParams.name || "",
    sort: queryParams.sort || "asc",
  });

  useEffect(() => {
    setFilters({
      perPage: queryParams.perPage || "10",
      name: queryParams.name || "",
      sort: queryParams.sort || "asc",
    });
  }, [location.search]);

  const handleChange = (
    e: React.ChangeEvent<HTMLElement & { name: string; value: string }>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newParams: Partial<Filters> = {};
    if (filters.perPage) newParams.perPage = filters.perPage;
    if (filters.name) newParams.name = filters.name;
    if (filters.sort) newParams.sort = filters.sort;

    const queryString = qs.stringify(newParams);
    navigate(`${location.pathname}?${queryString}`);
    handleClose();
  };

  const handleClear = () => {
    setFilters({
      perPage: "10",
      name: "",
      sort: "asc",
    });
    navigate(location.pathname);
    handleClose();
  };

  return (
    <>
      <Button
        variant="outline-primary"
        size="sm"
        onClick={handleShow}
        className="d-flex align-items-center gap-2"
      >
        <FaFilter /> Filter
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter Options</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="perPage">
              <Form.Label>Items per page</Form.Label>
              <Form.Select
                name="perPage"
                value={filters.perPage}
                onChange={handleChange}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name Filter</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={filters.name}
                onChange={handleChange}
                placeholder="Enter name..."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="sort">
              <Form.Label>Sort by Name</Form.Label>
              <Form.Select
                name="sort"
                value={filters.sort}
                onChange={handleChange}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                Apply Filters
              </Button>
              <Button variant="outline-secondary" onClick={handleClear}>
                Clear Filters
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Filter;
