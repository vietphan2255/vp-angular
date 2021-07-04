export interface AccountDTO {
  id?: number;
}

export class AccountModel {
  id: number = 0;

  constructor(accountDTO?: AccountDTO) {
    if (accountDTO) {
      this.id = accountDTO.id || this.id;
    }
  }
}
