export interface ResSignInPayload {
    jwtToken: string;
    userName: string;
    refreshToken: string;
    expiresAt: Date;

}