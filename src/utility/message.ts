export type Response = { [name: string]: { status?: number, message: string } }

export const ERROR_MESSAGE: Response = {
  CONNECTION_FAILED: { status: 500, message: 'Could not connect to Database' },
  SAVE_POLL_FAILED: { message: 'Insertion failed. Check with DB Admin' },
  FETCH_POLL_FAILED: { message: 'You have not created any poll yet' },
  IMAGE_UPLOAD_ERROR: { message: 'Image could not be saved' },
  UNAVAILABLE_RESOURCE: { status: 410, message: 'Requested resource is no longer available' }
};

export const SUCCESS_MESSAGE: Response = {
  SAVE_POLL_SUCCESS: { status: 201, message: 'Insertion Successfull' }
};
