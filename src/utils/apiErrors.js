class APIError extends Error {
  constructor(message, status = 500, type = '') {
    super(message);
    this.status = status;
    this.type = type;
  }
}
module.exports = APIError;
