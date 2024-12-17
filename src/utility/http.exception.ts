/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from '@/types/enums';
import { isString, isObject } from './shared';

type HttpExceptionBodyMessage = string | string[] | undefined;

interface HttpExceptionBody {
    status: number;
    statusText: HttpExceptionBodyMessage;
    internal: boolean;
    data?: HttpExceptionBodyMessage | null;
    error: Error;
}

export interface HttpExceptionOptions {
    cause?: unknown;
    description?: string;
}
export interface DescriptionAndOptions {
    description?: string;
    httpExceptionOptions?: HttpExceptionOptions;
}

/**
 * Universal Http Exceptions Handler based on NestJS.
 *
 * > | Author: @DevDJ
 * > | Version: 1.0.0
 * > | Credits: @NestJS
 *
 * !// TODO: Expanding the class and moving it to the NPM package.
 */
export class HttpException extends Error {
    private readonly response;
    private readonly status;
    private readonly options?;

    constructor(response: string | Record<string, any>, status: HttpStatus, options?: HttpExceptionOptions) {
        super();
        this.response = response;
        this.status = status;
        this.options = options;
        this.initMessage();
        this.initName();
        this.initCause();
    }

    cause: unknown;
    private initCause(): void {
        if (this.options?.cause) {
            this.cause = this.options.cause;
            return;
        } else {
            this.cause = 'App Guard by DevDJ';
        }
    }

    private initMessage(): void {
        if (isString(this.response)) {
            this.message = this.response;
        } else if (isObject(this.response) && isString(this.response.statusText)) {
            this.message = this.response.statusText;
        } else if (this.constructor) {
            this.message = this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ') ?? 'Error';
        }
    }

    private initName(): void {
        this.name = this.constructor.name;
    }

    getResponse(): string | object {
        return this.response;
    }

    getStatus(): HttpStatus {
        return this.status;
    }

    getMessage(): string {
        return this.message;
    }

    getCause(): unknown | string {
        return this.cause;
    }

    getOptions(): HttpExceptionOptions | undefined {
        return this.options;
    }

    static createBody(
        arg0: null | '' | HttpExceptionBodyMessage,
        arg1: HttpExceptionBodyMessage,
        status: HttpStatus
    ): HttpExceptionBody {
        if (!arg0) {
            return {
                status,
                statusText: arg1,
                internal: true,
                data: null,
                error: Error(),
            };
        }
        if (isString(arg0) || Array.isArray(arg0)) {
            return {
                status,
                statusText: arg0,
                internal: true,
                data: arg1,
                error: Error(arg1 as string),
            };
        }
        return arg0;
    }

    static getDescriptionFrom(descriptionOrOptions: string | HttpExceptionOptions): string | undefined {
        return isString(descriptionOrOptions) ? descriptionOrOptions : descriptionOrOptions?.description;
    }

    static getHttpExceptionOptionsFrom(descriptionOrOptions: string | HttpExceptionOptions): HttpExceptionOptions {
        return isString(descriptionOrOptions) ? {} : descriptionOrOptions;
    }

    static extractDescriptionAndOptionsFrom(
        descriptionOrOptions: string | HttpExceptionOptions
    ): DescriptionAndOptions {
        const description = isString(descriptionOrOptions) ? descriptionOrOptions : descriptionOrOptions?.description;
        const httpExceptionOptions = isString(descriptionOrOptions) ? {} : descriptionOrOptions;
        return {
            description,
            httpExceptionOptions,
        };
    }
}

export class BadGatewayException extends HttpException {
    constructor(
        objectOrError?: string | object | any,
        descriptionOrOptions: string | HttpExceptionOptions = 'Bad Gateway'
    ) {
        const { description, httpExceptionOptions } =
            HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(
            HttpException.createBody(objectOrError, description, HttpStatus.BAD_GATEWAY),
            HttpStatus.BAD_GATEWAY,
            httpExceptionOptions
        );
    }
}

export class BadRequestException extends HttpException {
    constructor(
        objectOrError?: string | object | any,
        descriptionOrOptions: string | HttpExceptionOptions = 'Bad Request'
    ) {
        const { description, httpExceptionOptions } =
            HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(
            HttpException.createBody(objectOrError, description, HttpStatus.BAD_REQUEST),
            HttpStatus.BAD_REQUEST,
            httpExceptionOptions
        );
    }
}

export class ForbiddenException extends HttpException {
    constructor(
        objectOrError?: string | object | any,
        descriptionOrOptions: string | HttpExceptionOptions = 'Forbidden'
    ) {
        const { description, httpExceptionOptions } =
            HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(
            HttpException.createBody(objectOrError, description, HttpStatus.FORBIDDEN),
            HttpStatus.FORBIDDEN,
            httpExceptionOptions
        );
    }
}

export class GatewayTimeoutException extends HttpException {
    constructor(
        objectOrError?: string | object | any,
        descriptionOrOptions: string | HttpExceptionOptions = 'Gateway Timeout'
    ) {
        const { description, httpExceptionOptions } =
            HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(
            HttpException.createBody(objectOrError, description, HttpStatus.GATEWAY_TIMEOUT),
            HttpStatus.GATEWAY_TIMEOUT,
            httpExceptionOptions
        );
    }
}

export class InternalServerErrorException extends HttpException {
    constructor(
        objectOrError?: string | object | any,
        descriptionOrOptions: string | HttpExceptionOptions = 'Internal Server Error'
    ) {
        const { description, httpExceptionOptions } =
            HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(
            HttpException.createBody(objectOrError, description, HttpStatus.INTERNAL_SERVER_ERROR),
            HttpStatus.INTERNAL_SERVER_ERROR,
            httpExceptionOptions
        );
    }
}

export class MethodNotAllowedException extends HttpException {
    constructor(
        objectOrError?: string | object | any,
        descriptionOrOptions: string | HttpExceptionOptions = 'Method Not Allowed'
    ) {
        const { description, httpExceptionOptions } =
            HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(
            HttpException.createBody(objectOrError, description, HttpStatus.METHOD_NOT_ALLOWED),
            HttpStatus.METHOD_NOT_ALLOWED,
            httpExceptionOptions
        );
    }
}

export class NotAcceptableException extends HttpException {
    constructor(
        objectOrError?: string | object | any,
        descriptionOrOptions: string | HttpExceptionOptions = 'Not Acceptable'
    ) {
        const { description, httpExceptionOptions } =
            HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(
            HttpException.createBody(objectOrError, description, HttpStatus.NOT_ACCEPTABLE),
            HttpStatus.NOT_ACCEPTABLE,
            httpExceptionOptions
        );
    }
}

export class NotFoundException extends HttpException {
    constructor(
        objectOrError?: string | object | any,
        descriptionOrOptions: string | HttpExceptionOptions = 'Not Found'
    ) {
        const { description, httpExceptionOptions } =
            HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(
            HttpException.createBody(objectOrError, description, HttpStatus.NOT_FOUND),
            HttpStatus.NOT_FOUND,
            httpExceptionOptions
        );
    }
}

export class PayloadTooLargeException extends HttpException {
    constructor(
        objectOrError?: string | object | any,
        descriptionOrOptions: string | HttpExceptionOptions = 'Payload Too Large'
    ) {
        const { description, httpExceptionOptions } =
            HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(
            HttpException.createBody(objectOrError, description, HttpStatus.PAYLOAD_TOO_LARGE),
            HttpStatus.PAYLOAD_TOO_LARGE,
            httpExceptionOptions
        );
    }
}

export class RequestTimeoutException extends HttpException {
    constructor(
        objectOrError?: string | object | any,
        descriptionOrOptions: string | HttpExceptionOptions = 'Request Timeout'
    ) {
        const { description, httpExceptionOptions } =
            HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(
            HttpException.createBody(objectOrError, description, HttpStatus.REQUEST_TIMEOUT),
            HttpStatus.REQUEST_TIMEOUT,
            httpExceptionOptions
        );
    }
}

export class ServiceUnavailableException extends HttpException {
    constructor(
        objectOrError?: string | object | any,
        descriptionOrOptions: string | HttpExceptionOptions = 'Service Unavailable'
    ) {
        const { description, httpExceptionOptions } =
            HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(
            HttpException.createBody(objectOrError, description, HttpStatus.CONFLICT),
            HttpStatus.CONFLICT,
            httpExceptionOptions
        );
    }
}

export class UnauthorizedException extends HttpException {
    constructor(
        objectOrError?: string | object | any,
        descriptionOrOptions: string | HttpExceptionOptions = 'Unauthorized'
    ) {
        const { description, httpExceptionOptions } =
            HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(
            HttpException.createBody(objectOrError, description, HttpStatus.UNAUTHORIZED),
            HttpStatus.UNAUTHORIZED,
            httpExceptionOptions
        );
    }
}

export class ApiException extends HttpException {
    constructor(
        objectOrError?: string | object | any,
        descriptionOrOptions: string | HttpExceptionOptions = 'Api Error'
    ) {
        const { description, httpExceptionOptions } =
            HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(
            HttpException.createBody(objectOrError, description, HttpStatus.API),
            HttpStatus.API,
            httpExceptionOptions
        );
    }
}
