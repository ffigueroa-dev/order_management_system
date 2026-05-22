export const mapZodErrors = (error) => {
  return error.flatten().fieldErrors;
};