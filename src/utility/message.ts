export type Response = { [name: string]: { status?: number, message: string } }

export const ERROR_MESSAGE: Response = {
  CONNECTION_FAILED: { status: 503, message: 'Could not connect to Database' },
  SAVE_POLL_FAILED: { message: 'Insertion failed. Check with DB Admin' },
  FETCH_POLL_FAILED: { message: 'You have not created any poll yet' },
  IMAGE_UPLOAD_ERROR: { message: 'Image could not be saved' },
  UNAVAILABLE_RESOURCE: { status: 410, message: 'Requested resource is no longer available' },
  INCORRECT_PIN: { status: 401, message: 'Incorrect pin' },
  ERROR_VOTING: { status: 500, message: 'Unable to vote due to server error' },
  MISSING_DATA: { status: 409, message: 'Request could not be processed as some inputs were missing' },
  UPDATE_POLL_FAILED: { status: 404, message: 'Updation failed' },
  DELETE_POLL_FAILED: { status: 404, message: 'Deletion failed' },
  INVALID_TOKEN: { status: 403, message: 'Invalid Token or token has expired' },
  TOKEN_MSSING: { status: 401, message: 'Unauthorized request' }
};

export const SUCCESS_MESSAGE: Response = {
  SAVE_POLL_SUCCESS: { status: 201, message: 'Insertion successfull' },
  VOTING_SUCCESS: { status: 200, message: 'Vote captured successfully' },
  UPDATE_POLL_SUCCESS: { status: 200, message: 'Updated successfully' },
  DELETE_POLL_SUCCESS: { status: 200, message: 'Deleted successfully' }
};

export const INFO_MESSAGE: Response = {
  TITLE_REQUIRED: { message: 'Please provide a title for the poll' },
  MIN_PARTICIPANT_COUNT: { message: 'There has to be minimum of 3 participants to take part in poll' },
  PRIVACY_TYPE_REQUIRED: { message: 'Please set a privacy type for the poll' },
  RESULT_DISPLAY_TYPE: { message: 'Please set the display type for the results' },
  CANDIDATES_REQUIRED: { message: 'Please add candidates for the poll' },
  MIN_CANDIDATES: { message: 'There needs to be minimum of 2 candidates to set up a poll' },
  MIN_VOTE: { message: 'Votes cannot go negative' },
  HOST_REQUIRED: { message: 'Hostname not specified' },
  MAX_DURATION: { message: 'A Poll cannot be hosted more than 30 days' }
};
