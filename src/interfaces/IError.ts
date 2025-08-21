export interface IError {
  /**
   * The error code.
   */
  code: string;
  /**
   * The error message.
   */
  message: string;
  /**
   * The error details.
   */
  details?: string;
  /**
   * The error stack trace.
   */
  stack?: string;
}