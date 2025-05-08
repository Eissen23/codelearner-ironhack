import qs from "qs";

export const addParamToUrl = (params: Record<string, any>): string => {
  const currentParams = qs.parse(window.location.search.slice(1));
  const newParams = { ...currentParams, ...params };
  const queryString = qs.stringify(newParams);
  return `${window.location.pathname}${queryString ? `?${queryString}` : ""}`;
};
