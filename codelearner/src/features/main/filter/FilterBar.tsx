import React, { useState, useEffect, FormEvent } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import * as qs from "qs";

interface Filters {
  perPage: string;
  name: string;
  sort: string;
}

const FilterBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  // Update filters when URL changes
  useEffect(() => {
    setFilters({
      perPage: queryParams.perPage || "10",
      name: queryParams.name || "",
      sort: queryParams.sort || "asc",
    });
  }, [location.search]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create new query string, excluding empty values
    const newParams: Partial<Filters> = {};
    if (filters.perPage) newParams.perPage = filters.perPage;
    if (filters.name) newParams.name = filters.name;
    if (filters.sort) newParams.sort = filters.sort;

    const queryString = qs.stringify(newParams);
    navigate(`${location.pathname}?${queryString}`);
  };

  // Handle clear filters
  const handleClear = () => {
    setFilters({
      perPage: "10",
      name: "",
      sort: "asc",
    });
    navigate(location.pathname);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="py-2 bg-body-secondary rounded-4 mx-3 px-3 my-3"
    >
      <Row className="align-items-end">
        <Col md={3}>
          <Form.Group controlId="perPage">
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
        </Col>
        <Col md={3}>
          <Form.Group controlId="name">
            <Form.Label>Name Filter</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              placeholder="Enter name..."
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="sort">
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
        </Col>
        <Col md={3}>
          <Button variant="primary" type="submit" className="me-2">
            Apply Filters
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterBar;
