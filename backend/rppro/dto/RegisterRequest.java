package com.example.rppro.dto;

import com.example.rppro.entity.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String username;
    private String password;
    private Role role;
}