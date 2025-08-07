import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const ErrorMessage = ({
  error,
}: {
  error: FetchBaseQueryError | SerializedError;
}) => {
  if ("status" in error) {
    // FetchBaseQueryError
    const errorData = error.data as { message?: string } | undefined;
    return (
      <div data-testid="error-message">
        {errorData?.message || "An unexpected error occurred."}
      </div>
    );
  } else {
    // SerializedError
    return (
      <div data-testid="error-message">
        {error.message || "An unexpected error occurred."}
      </div>
    );
  }
};
