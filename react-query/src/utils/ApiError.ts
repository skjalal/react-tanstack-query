export default class ApiError extends Error {
  constructor(
    message: string,
    public code: number,
    public info: { message: string } | null,
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
