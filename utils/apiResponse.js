class ApiResponse {
  constructor({ message, data }) {
    this.data = data ?? null;
    this.message = message;
  }
}

module.exports = ApiResponse;
