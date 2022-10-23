import { Response } from "express";

const messages: { [key: number]: string } = {
    200: "OK",
    201: "Created",
    202: "Accepted",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    405: "Not Acceptable",
    500: "Internal Server Error"
};

const generateResponse = (
    res: Response,
    code: number  = 200,
    result?: any,
    message?: string) => {
    if (!res) return;

    if (!message) {
        message = code in messages ? messages[code] : code as unknown as string;
    }

    return res.status(code).json({ code, message, result: { ...result } });
};

export default generateResponse;