export const UI = {
  errors: {
    genericError: 'Something went wrong. Please try again.',
    somethingWentWrongPageTitle: 'Brace yourself till we get the error fixed.',
    somethingWentWrongPageDescription:
      'You may also refresh the page or try again latter',
    networkError: 'Network error. Please check your internet connection.',
    notFound: 'The page you are looking for does not exist.',
    unauthorized: 'You are not authorized to view this page.',
    forbidden: 'Access is forbidden.',
    timeout: 'Request timed out. Please try again later.',
  },
  responses: {
    errors: {
      general: {
        unexpected: 'An unexpected error occurred. Please try again later.',
        connection:
          'Unable to connect to the server. Please check your internet connection.',
      },
      badRequest: {
        missingParameter:
          'The {{parameter}} is required but was not provided. Please check your input and try again.',
        parameterRequired:
          'Missing required parameter: {{parameter}}. Please ensure all required fields are filled out.',
        invalidPayload:
          'There is some error in parsing your input. Please check your input and try again',
      },
      unauthorized: {
        noAccessToken: 'Unauthorized access. Please log in to continue.',
        accessDenied: 'Access denied. No valid access token provided.',
        invalidCredentials: 'Invalid password. Please try again.',
        invalidOTP: 'Invalid OTP or expired. Please try again.',
        tokenExpired: 'Session expired, please login again',
      },

      forbidden: {
        noPermission: 'You do not have permission to access this resource.',
        insufficientPermissions:
          'Insufficient permissions to perform this action.',
      },
      notFound: {
        resourceNotFound:
          'The requested {{resource}} could not be found. It might have been removed.',
        unableToLocate:
          'Unable to locate the {{resource}} you are looking for.',
      },
      conflict: {
        resourceExists:
          'The {{resource}} already exists. Duplicate entries are not allowed.',
        conflictDetected:
          'Conflict detected. The {{resource}} you are trying to create already exists.',
        usedSomewhere:
          ' The {{resource}} you are trying to delete is used somewhere else.',
      },
      server: {
        internalError:
          'An internal server error occurred. Please try again later.',
        somethingWrong:
          'Something went wrong on our end. Please try again later.',
      },
      review: {
        notOrdered: 'You can only review a product you have purchased.',
        notPaid:
          'You can only review a product after the payment is completed.',
      },
      login: {
        invalidCredentials: 'Invalid password. Please try again.',
        accountLocked:
          'Your account is locked. Please contact support for assistance.',
      },
      signup: {
        emailExists:
          'This email is already registered. Please use a different email or log in.',
        signupFailed:
          'Unable to complete signup. Please check your input and try again.',
      },
      changePassword: {
        incorrectCurrentPassword:
          'Current password is incorrect. Please try again.',
        changeFailed:
          'Password change failed. Please ensure your new password meets the requirements and try again.',
      },
      verifyEmail: {
        invalidLink:
          'Invalid or expired verification link. Please request a new verification email.',
        verifyFailed:
          'Unable to verify email. Please try again later or contact support.',
      },
      get: {
        failed: 'Failed to retrieve {{resource}}.',
        notFound: 'The {{resource}} could not be found.',
      },
      create: {
        failed: 'Failed to create {{resource}}.',
        invalid:
          'The new {{resource}} could not be created due to invalid data.',
      },
      update: {
        failed: 'Failed to update {{resource}}.',
        notUpdated: 'The {{resource}} could not be updated.',
      },
      delete: {
        failed: 'Failed to delete {{resource}}.',
        notRemoved: 'The {{resource}} could not be removed.',
      },
      invalidId: {
        format: 'Invalid ID provided. Please check your input and try again.',
      },

      accountExists:
        'An account with this email already exists. Please log in or use a different email.',
      accountNotFound:
        'No account found with this email. Please check your email or sign up for a new account.',
    },
    success: {
      get: {
        success: 'Successfully retrieved {{resource}}.',
        loaded: 'The {{resource}} has been successfully loaded.',
      },
      create: {
        success: 'Successfully created {{resource}}.',
        added: 'The new {{resource}} has been successfully added.',
      },
      update: {
        success: 'Successfully updated {{resource}}.',
        updated: 'The {{resource}} has been successfully updated.',
      },
      delete: {
        success: 'Successfully deleted {{resource}}.',
        removed: 'The {{resource}} has been successfully removed.',
      },
      login: 'Successfully logged in. Welcome back!',
      signup:
        'Account created successfully. Please check your email to verify your account.',
      changePassword: {
        success: 'Your password has been changed successfully.',
        updated:
          'Password updated successfully. Please use your new password to log in.',
      },
      verifyEmail: {
        success: 'Email verified successfully. You can now log in.',
        verified: 'Your email has been successfully verified. Thank you!',
      },
      otp: {
        success:
          'OTP sent successfully. Please check your email or phone for the verification code.',
        verified: 'OTP verified successfully, you are logged in now',
      },
      forgotPassword: {
        success:
          'Password reset link has been sent to your email.Please check your {{resource}} for the verification code.',
        verified:
          'The OTP has been verified successfully. You are now logged in.',
      },
      resetPassword: {
        success:
          'Password reset successfully. Please use your new password to log in.',
      },
      emailVerified: {
        success: 'Email verified successfully.',
        sent: 'verification Email sent successfully.',
      },
      contactUs: {
        success: 'Thank you for reaching out! We will get back to you shortly.',
      },
    },
  },
};
