/**

 * Generic class representing a standardized API response.

 * This class encapsulates both success and error responses for consistency.

 *

 * @template T - The type of the response data.

 */

export default class ActionResponse<T = unknown> {
  /** Indicates whether the request was successful. */

  public readonly success: boolean

  /** HTTP status code of the response. */

  public readonly status: number

  /** Response data (if successful). */

  private readonly _data: T | null

  /** Message providing additional context for the response. */

  public message: string

  /** Optional error message (only set when success is `false`). */

  public readonly error?: string

  /** Stack trace for debugging (only available in non-production environments). */

  private _stackTrace?: string

  /** Timestamp when the response was created (only available in non-production environments). */

  private _timestamp?: string

  /**
  
     * Creates an instance of `ActionResponse`.
  
     *
  
     * @param status - HTTP status code of the response.
  
     * @param data - The response data of type `T` (null if an error occurs).
  
     * @param message - Optional message describing the response.
  
     * @param error - Optional error message (only for failed responses).
  
     */

  constructor(
    status: number,

    data: T | null,

    message?: string,

    error?: string,
  ) {
    this.status = status

    this.message = message || ''

    this._data = data

    this.success = this.isSuccess()

    if (error) {
      this.error = error // Store the error message if available
    }

    // Include stack trace only in non-production environments

    if (!this.success && process.env.NODE_ENV !== 'production') {
      this._stackTrace = new Error().stack || ''
    }

    // Include timestamp only in non-production environments for debugging purposes

    if (process.env.NODE_ENV !== 'production') {
      this._timestamp = new Date().toISOString()
    }
  }

  /**
  
     * Determines whether the response status indicates success.
  
     *
  
     * @returns `true` if the status is between 200 and 299, otherwise `false`.
  
     */

  private isSuccess(): boolean {
    return this.status >= 200 && this.status < 300
  }

  /**
  
     * Retrieves the response timestamp.
  
     *
  
     * @returns The timestamp if in a non-production environment, otherwise `undefined`.
  
     */

  public get timestamp(): string | undefined {
    return process.env.NODE_ENV !== 'production' ? this._timestamp : undefined
  }

  /**
  
     * Retrieves the response data.
  
     *
  
     * @returns The response data of type `T`, or `null` if an error occurred.
  
     */

  public get data(): T | null {
    return this._data
  }

  /**
  
     * Retrieves the stack trace (only available in non-production environments).
  
     *
  
     * @returns The stack trace string or `undefined`.
  
     */

  public get stackTrace(): string | undefined {
    return process.env.NODE_ENV !== 'production' ? this._stackTrace : undefined
  }

  /**
  
     * Checks if the response represents an error.
  
     *
  
     * @returns `true` if the response is an error, otherwise `false`.
  
     */

  public isError(): boolean {
    return !this.success
  }

  /**
  
     * Serializes the response into a plain object for JSON serialization.
  
     * This method is automatically used by Next.js and `JSON.stringify()`.
  
     *
  
     * @returns A plain object representation of the response.
  
     */

  public toJSON() {
    return {
      success: this.success,

      status: this.status,

      data: this._data,

      message: this.message,

      error: this.error, // Included only if it's an error

      stackTrace: this.stackTrace, // Only included in non-production environments

      timestamp: this.timestamp, // Only included in non-production environments
    }
  }

  /**
  
     * Static method to create a successful response.
  
     *
  
     * @param status - HTTP status code (default 200).
  
     * @param data - Response data.
  
     * @param message - Optional success message.
  
     * @returns An `ActionResponse` instance for success.
  
     */

  public static success<T>(data: T, status: number = 200, message?: string) {
    return new ActionResponse<T>(status, data, message).toJSON()
  }

  /**
  
     * Static method to create an error response.
  
     *
  
     * @param status - HTTP status code indicating the error.
  
     * @param error - Error message.
  
     * @param message - Optional additional message.
  
     * @returns An `ActionResponse` instance for an error.
  
     */

  public static error(status: number, error: string, message?: string) {
    return new ActionResponse<null>(
      status,

      null,

      message || 'Error',

      error,
    ).toJSON()
  }
}
