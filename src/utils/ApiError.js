/**
 * Định nghĩa riêng một Class ApiError kế thừa class Error sẵn của Express(điều này cần thiết và là Best Practice vì class Error nó là class built-in sẵn)
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    // Gọi tới hàm khởi tạo của class Error (class cha) để còn dùng this (kiến thức OOP lập trình hướng đối tượng căn bản)
    // Thằng cha (Error) có property message rồi nên gọi nó luôn trong super cho gọn
    super(message) //super: Gọi property message từ Error của Express xuống thg con là ApiError

    // Tên của cái custom Error này, nếu không set thì mặc định nó sẽ kế thừa là "Error"
    this.name = 'ApiError' //name là  của Error, ghi đè

    // Gán thêm http status code của chúng ta ở đây
    this.statusCode = statusCode//statusCode là  của Error, ghi đè

    // Ghi lại Stack Trace (dấu vết ngăn xếp) để thuận tiện cho việc debug
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError