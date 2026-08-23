export class CreateUserDto {
  email: string;
  hashedPassword: string;
}
export class CreateUserLoginDto{
  email:string;
  password: string;
}