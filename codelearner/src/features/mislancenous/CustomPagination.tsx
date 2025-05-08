import { Link } from "../../types/paginator.type";
import { Pagination } from "react-bootstrap";
import { addParamToUrl } from "../../utils/addParamToUrl";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface CustomPaginationProps {
  links: Link[];
}
const CustomPagination = ({ links }: CustomPaginationProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page") || "";
    setCurrentPage(page);
  }, [location.search]);

  return (
    <Pagination className="mt-3 justify-content-center">
      {links.map((link, index) => (
        <Pagination.Item
          key={index}
          active={link.label == currentPage}
          disabled={!link.url}
          href={`?page=${link.label}` || "#"}
          onClick={(e) => {
            e.preventDefault();
            const newUrl = addParamToUrl({ page: link.label });
            navigate(newUrl);
          }}
        >
          {link.label.replace("&laquo;", "«").replace("&raquo;", "»")}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default CustomPagination;
