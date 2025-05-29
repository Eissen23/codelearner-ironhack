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

export const getBadgeVariant2 = (role: string) => {
  switch (role) {
    case "OrgHead":
      return "success";
    case "Moderator":
      return "danger";
    case "Pending":
      return "secondary";
    default:
      return "danger";
  }
};
