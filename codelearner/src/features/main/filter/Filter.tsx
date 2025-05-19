import React, { useState, useEffect, FormEvent } from "react";
import { Form, Button, Offcanvas } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import * as qs from "qs";
import { FaFilter } from "react-icons/fa";
import TagFilter from "./TagsFilter";

interface Filters {
  per_page: string;
  keyword: string;
  sort: string;
  tags: string[];
}

interface FilterProps {
  problem_only?: boolean;
}

const Filter: React.FC<FilterProps> = ({ problem_only }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Parse initial query parameters from URL
  const queryParams = qs.parse(location.search, {
    ignoreQueryPrefix: true,
    comma: true,
  });

  // Helper function to normalize tags
  const normalizeTags = (tags: unknown): string[] => {
    if (Array.isArray(tags)) {
      return tags.map(String);
    }
    if (typeof tags === "string") {
      return tags.split(",").filter((tag) => tag.trim() !== "");
    }
    return [];
  };

  // State for filters
  const [filters, setFilters] = useState<Filters>({
    per_page:
      typeof queryParams.per_page === "string" ? queryParams.per_page : "",
    keyword: typeof queryParams.keyword === "string" ? queryParams.keyword : "",
    sort: typeof queryParams.sort === "string" ? queryParams.sort : "",
    tags: normalizeTags(queryParams.tags),
  });

  useEffect(() => {
    setFilters({
      per_page:
        typeof queryParams.per_page === "string" ? queryParams.per_page : "",
      keyword:
        typeof queryParams.keyword === "string" ? queryParams.keyword : "",
      sort: typeof queryParams.sort === "string" ? queryParams.sort : "",
      tags: normalizeTags(queryParams.tags),
    });
  }, [location.search]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLElement & { name: string; value: string | string[] }
    >
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
    if (filters.per_page) newParams.per_page = filters.per_page;
    if (filters.keyword) newParams.keyword = filters.keyword;
    if (filters.sort) newParams.sort = filters.sort;
    if (filters.tags.length) newParams.tags = filters.tags; // Assign array directly

    const queryString = qs.stringify(newParams, { arrayFormat: "comma" });
    navigate(`${location.pathname}?${queryString}`);
    handleClose();
  };

  const handleClear = () => {
    setFilters({
      per_page: "",
      keyword: "",
      sort: "",
      tags: [],
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
            <Form.Group className="mb-3" controlId="per_page">
              <Form.Label>Items per page</Form.Label>
              <Form.Select
                name="per_page"
                value={filters.per_page}
                onChange={handleChange}
              >
                <option value="">Select items per page</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="keyword">
              <Form.Label>Name Filter</Form.Label>
              <Form.Control
                type="text"
                name="keyword"
                value={filters.keyword}
                onChange={handleChange}
                placeholder="Enter name..."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="sort">
              <Form.Label>Sort options</Form.Label>
              <Form.Select
                name="sort"
                value={filters.sort}
                onChange={handleChange}
              >
                <option value="">Select order</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="created_at-asc">
                  Created At (Oldest First)
                </option>
                <option value="created_at-desc">
                  Created At (Newest First)
                </option>
                {problem_only && [
                  <option key="difficulty-asc" value="difficulty-asc">
                    Difficulty (Easy to Hard)
                  </option>,
                  <option key="difficulty-desc" value="difficulty-desc">
                    Difficulty (Hard to Easy)
                  </option>,
                ]}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="tags">
              <Form.Label>Tags</Form.Label>
              <TagFilter
                name="tags"
                initialTags={filters.tags}
                onChange={handleChange}
              />
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
