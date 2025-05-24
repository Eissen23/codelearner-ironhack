export const getBadgeVariant = (status: string) => {
  switch (status) {
    case "published":
      return "success";
    case "unpublished":
      return "danger";
    default:
      return "warning";
  }
};
