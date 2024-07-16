class ApiResponse {
  constructor(message: string, data: any) {
    data = data ?? null;
    message = message;
  }
}

export { ApiResponse };
