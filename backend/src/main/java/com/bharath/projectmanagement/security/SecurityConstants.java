package com.bharath.projectmanagement.security;

public class SecurityConstants {
  public static final String SIGNUP_URL = "/api/users/**";
  public static final String SECRET = "JWTSecSignOffSecret31738121";
  public static final String TOKEN_PREFIX = "Bearer ";
  public static final String HEADER_STRING = "Authorization";
  // Setting it to 1 year. Represented in ms.
  public static final long TOKEN_EXPIRATION_TIME = 3000000;
  
}