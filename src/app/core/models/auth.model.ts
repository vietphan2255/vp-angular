declare type TokenType = 'baer' | null;

export interface AuthDTO {
  access_token?: string;
  refresh_token?: string;
  type?: TokenType;
  expired_time?: number;
}

export class AuthModel {
  accessToken: string = '';
  refreshToken: string = '';
  type: TokenType = null;
  expiredTime: number = 0;

  constructor(authDTO?: AuthDTO) {
    this.accessToken = (authDTO && authDTO.access_token) || this.accessToken;
    this.refreshToken = (authDTO && authDTO.refresh_token) || this.refreshToken;
    this.type = (authDTO && authDTO.type) || this.type;
    this.expiredTime = (authDTO && authDTO.expired_time) || this.expiredTime;
  }
}
