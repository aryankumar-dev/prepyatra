export function getErrorMessage(err, fallback = "An unexpected error occurred") {
  return err.response?.data?.message || fallback;
}

export function getFieldErrors(err) {
  const errors = err.response?.data?.errors;
  if (!Array.isArray(errors)) return {};
  return errors.reduce((acc, { field, message }) => {
    if (!acc[field]) acc[field] = message;
    return acc;
  }, {});
}
