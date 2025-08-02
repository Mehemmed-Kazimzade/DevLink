export type ApiResponse<T> =
  | { status: "SUCCESS"; data: T }
  | { status: "ERROR"; data: string }
  | { status: "UNEXPECTED_ERROR"; data: any };