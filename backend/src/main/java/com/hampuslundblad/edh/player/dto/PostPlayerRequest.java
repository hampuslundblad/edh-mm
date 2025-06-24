package com.hampuslundblad.edh.player.dto;

import jakarta.validation.constraints.NotBlank;

public record PostPlayerRequest(
    @NotBlank String name
) {}