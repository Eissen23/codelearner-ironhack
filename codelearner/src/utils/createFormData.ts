export const createFormData = (data: Object): FormData => {
  const formDataToSend = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (value instanceof File) {
        formDataToSend.append(key, value, value.name); // Explicitly handle File with filename
      } else if (typeof value === "string" || value instanceof Blob) {
        formDataToSend.append(key, value); // Appends File or string
      }
    }
  });

  return formDataToSend;
};
