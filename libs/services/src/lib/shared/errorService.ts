import { apiResponseType, ToastTypeEnum } from '@accent-tech/types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { isServerSide } from '../utils';

export class MyError extends Error {
  status: number;
  code: boolean;
  result: any;

  constructor(data: apiResponseType) {
    super(data.error || 'An error occurred'); // Pass a default message to the parent Error class
    this.name = 'MyError';
    this.status = data.status;
    this.code = data.code;
    this.result = data.result;

    // Maintain proper stack trace (only in V8 environments like Chrome and Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MyError);
    }
  }
}

export function isMyError(error: unknown): error is MyError {
  return (
    Object.prototype.toString.call(error) === '[object MyError]' ||
    (error instanceof Error &&
      'status' in error &&
      'code' in error &&
      'result' in error)
  );
}

export class ErrorService {
  static handleResponse(response: apiResponseType) {
    if (!response) return false;

    const { status, code, error, result, message } = response;

    if (status === 200) {
      if (code) {
        this.sendOkMessage(error || message || 'Request successful');
        return result;
      } else {
        this.sendErrorMessage(error || 'Operation failed. Please try again.');
        return null;
      }
    }

    if (status === 201) {
      if (code) {
        this.sendOkMessage(error || 'Request successful');
        return result;
      } else {
        this.sendErrorMessage(error || 'Operation failed. Please try again.');
        return null;
      }
    }

    if (status >= 400 && status < 500) {
      this.handleClientError(status, error);
      return null;
    }

    if (status === 500) {
      this.sendErrorMessage('Server Error: An error occurred on the server.');
      return null;
    }

    this.sendErrorMessage(`An unknown error occurred: ${error}`);
    return null;
  }

  static handleClientError(status: number, error?: string | null): void {
    switch (status) {
      case 400:
        this.sendErrorMessage(error || 'Bad Request: The request was invalid.');
        break;
      case 401:
        this.sendErrorMessage(
          error || 'Session Expired: Please log in to continue.',
        );
        break;
      case 404:
        this.sendWarnMessage(
          error || 'Not Found: The requested resource was not found',
        );
        break;
      case 403:
      case 409:
        this.sendWarnMessage(
          error ||
            'Forbidden: You do not have permission to access this resource',
        );
        break;
      default:
        this.sendErrorMessage(error || 'Client Error');
        break;
    }
  }

  static handleSeverError(error: apiResponseType) {
    this.logError(error?.error || 'unexpected error occurred !!');

    // Define a generic error structure
    const errorResponse = {
      code: error?.code,
      result: error?.result,
      message: error?.error || 'unexpected error occurred !!',
      status: error?.status || 500,
    };

    // Return detailed error info if server-side, else null
    return isServerSide ? errorResponse : null;
  }

  static displayAlert(type?: ToastTypeEnum, message = 'Something went wrong') {
    if (type) {
      toast[type](message);
    } else {
      toast(message);
    }
  }

  static serializeError(error: unknown): apiResponseType {
    if (error instanceof AxiosError) {
      return {
        code: false,
        status: error?.response?.status || 500,
        error:
          error?.response?.data?.message || error?.message || 'Failed to fetch',
        result: null,
      };
    }
    if (error instanceof XMLHttpRequest) {
      return {
        code: false,
        status: error?.status,
        error: error?.response,
        result: null,
      };
    }
    if (error instanceof Error) {
      return {
        code: false,
        status: 500,
        error: error.message,
        result: null,
      };
    }

    return {
      code: false,
      status: 500,
      error: 'Unexpected: caught response is not an instance of Error',
      result: null,
    };
  }

  static sendNotification(msg: string) {
    this.displayAlert(undefined, msg);
  }

  static logError(msg: string) {
    this.displayAlert(ToastTypeEnum.ERROR, msg);
  }

  static sendOkMessage(msg: string) {
    this.displayAlert(ToastTypeEnum.SUCCESS, msg);
  }

  static sendErrorMessage(msg: string) {
    this.displayAlert(ToastTypeEnum.ERROR, msg);
  }

  static sendWarnMessage(msg: string) {
    this.displayAlert(ToastTypeEnum.WARNING, msg);
  }
  static handleError(error: unknown) {
    if (error instanceof AxiosError) {
      return {
        code: error.code,
        status: error.response?.status || 500,
        error: error?.message || error?.response?.data || 'Failed to fetch',
        result: null,
      };
    }
    return {
      code: false,
      status: 500,
      error: 'Something went wrong',
      result: null,
    };
  }
}
