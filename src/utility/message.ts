export type ErrorMessage = { [name: string]: { status: number, message: string } }

export const MESSAGE:ErrorMessage = {
  CONNECTION_FAILED: { status: 500, message: 'Could not connect to Database' }
}
