import { Response } from "express";

const messages: { [key: number]: string } = {
    200: "Success",
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
    code: number = 200,
    message?: string,
    result?: any,
) => {
    if (!res) return;

    if (!message) {
        message = code in messages ? messages[code] : code as unknown as string;
    }
    if (!result)
        return res.status(code).json({ code, message });

    return res.status(code).json({ code, message, result: { ...result } });
};

export default generateResponse;