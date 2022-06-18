import { IsString } from "class-validator"


export class UpdateUserDto {
    @IsString()
    private name?: string

    @IsString()
    private description?: string

    @IsString()
    private country?: string

    @IsString()
    private avatar?: string

    @IsString()
    private banner?: string
}