export function errorHandler (error:any) {
  const err:any = new Error(error.message);
  err.status = error.status;
  return err;
}
