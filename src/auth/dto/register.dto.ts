import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";


export class RegisterDto {

    @MinLength(5, { message: "Email must have at least 5 characters" })
    @MaxLength(50, { message: "Email must have less than 50 characters" })
    @IsEmail()
    email: string

    @IsString()
    @MinLength(6, { message: "Password must have at least 6 characters" })
    @MaxLength(35, { message: "Password must have less than 35 characters" })
    password: string


    @IsString()
    @MinLength(2, { message: "Name must have at least 2 characters" })
    @MaxLength(35, { message: "Name must have less than 35 characters" })
    name: string
}