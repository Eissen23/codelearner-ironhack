export const decodeBase64 = (base64String: string): string => {
  try {
    // Create a buffer from the base64 string and convert to ASCII
    const buffer = Buffer.from(base64String, 'base64');
    return buffer.toString('ascii');
  } catch (error) {
    console.error('Error decoding base64 string:', error);
    return '';
  }
};
