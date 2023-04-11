interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName?: string;
  authorities: Set<'Admin' | 'Mod' | 'RegisteredUser'>;
  nif?: string;
  morada?: string;
}

export class User implements IUser {
  userId: number;
  username: string;
  password: string;
  fullName?: string;
  authorities: Set<'Admin' | 'Mod' | 'RegisteredUser'>;
  nif?: string;
  morada?: string;

  constructor(
    userId: number,
    username: string,
    password: string,
    fullName?: string,
    nif?: string,
    morada?: string,
  ) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.fullName = fullName;
    this.nif = nif;
    this.morada = morada;
  }
}
