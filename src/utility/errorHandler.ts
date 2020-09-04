export function errorHandler (error: any, stack: any = null) {
  const err: any = new Error(error.message);
  err.status = error.status;
  err.stack = stack;
  return err;
}
