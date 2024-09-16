package com.os.controller.exceptions;

public class DataIntegratyViolationException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public DataIntegratyViolationException(Throwable cause) {
        super(cause);
    }

    public DataIntegratyViolationException(String message) {
        super(message);
    }
}
