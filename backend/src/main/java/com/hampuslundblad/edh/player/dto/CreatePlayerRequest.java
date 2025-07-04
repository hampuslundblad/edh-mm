package com.hampuslundblad.edh.player.dto;

import jakarta.validation.constraints.NotBlank;

public record CreatePlayerRequest(
    @NotBlank String name
) {}