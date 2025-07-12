export type ApiResponse<T> =
  | { status: "SUCCESS"; data: T }
  | { status: "ERROR"; data: string }  // e.g., user already exists error response
  | { status: "UNEXPECTED_ERROR"; data: any };