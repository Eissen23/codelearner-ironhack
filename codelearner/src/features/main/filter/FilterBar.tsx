import React, { useState, useEffect, FormEvent } from "react";
import { Form, Button, Row } from "react-bootstrap";
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
      className="py-1 bg-body-secondary rounded-3 mx-2 px-2 my-2"
    >
      <Row className="align-items-end g-2 d-flex flex-wrap">
        <Form.Group controlId="perPage" className="d-flex w-25">
          <Form.Label className="small">Items per page</Form.Label>
          <Form.Select
            name="perPage"
            value={filters.perPage}
            onChange={handleChange}
            size="sm"
            className="w-50"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="name" className="d-flex w-25">
          <Form.Label className="small">Name Filter</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={filters.name}
            onChange={handleChange}
            placeholder="Enter name..."
            size="sm"
            className="w-50"
          />
        </Form.Group>
        <Form.Group controlId="sort" className="d-flex w-25">
          <Form.Label className="small">Sort by Name</Form.Label>
          <Form.Select
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            size="sm"
            className="w-50"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" size="sm" className="me-1">
          Apply
        </Button>
        <Button variant="secondary" onClick={handleClear} size="sm">
          Clear
        </Button>
      </Row>
    </Form>
  );
};

export default FilterBar;
