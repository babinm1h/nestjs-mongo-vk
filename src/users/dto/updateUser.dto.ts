import { IsString } from "class-validator"


export class UpdateUserDto {
    @IsString()
    readonly name?: string

    @IsString()
    readonly description?: string

    @IsString()
    readonly country?: string

    readonly avatar?: Express.Multer.File

    readonly banner?: Express.Multer.File
}


export class UpdateUserBody {
    @IsString()
    readonly name?: string

    @IsString()
    readonly description?: string

    @IsString()
    readonly country?: string
}