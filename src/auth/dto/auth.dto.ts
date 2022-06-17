import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";


export class AuthDto {

    @MinLength(5, { message: "Email must have at least 5 characters" })
    @MaxLength(50, { message: "Email must have less than 50 characters" })
    @IsEmail()
    email: string

    @IsString()
    @MinLength(6, { message: "Password must have at least 6  characters" })
    @MaxLength(35, { message: "Password must have less than 35 characters" })
    password: string
}