export class AppError extends Error {
	public statusCode: number;
	public isOperational: boolean;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		// Помечаем ошибку как "ожидаемую" (наша бизнес-логика)
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}