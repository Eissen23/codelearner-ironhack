import { useSearchParams } from "react-router";

export const getDefaultParam = () => {
  const [searchParams] = useSearchParams();

  // Extract query parameters without applying defaults here
  const page = searchParams.get("page") || "1";
  const per_page = searchParams.get("per_page") || "";
  const keyword = searchParams.get("keyword") || "";
  const sort = searchParams.get("sort") || "";

  return { page, per_page, keyword, sort };
};
