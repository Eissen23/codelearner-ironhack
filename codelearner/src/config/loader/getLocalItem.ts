/**
 * Retrieves the auth token from local storage
 * @returns string | null - The auth token if it exists, null otherwise
 */
export const getAuthToken = (): string | null => {
  try {
    const token = localStorage.getItem("auth_token");
    return token;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};
