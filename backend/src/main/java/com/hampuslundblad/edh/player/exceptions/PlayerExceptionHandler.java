package com.hampuslundblad.edh.player.exceptions;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;
@ControllerAdvice
public class PlayerExceptionHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(PlayerNotFoundException.class)
    public void handlePlayerNotFound(PlayerNotFoundException ex) {
        // Optionally log or add a response body
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(DuplicateDeckNameException.class)
    public void handleDuplicateDeckName(DuplicateDeckNameException ex) {
      
    }
}
