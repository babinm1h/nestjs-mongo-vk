import { Body, Controller, Post, Request, UsePipes, ValidationPipe, Get, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtGuard } from "./guards/jwt.guard";
import { LocalGuard } from "./guards/local.guard";

@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UsePipes(new ValidationPipe())
    @Post('/register')
    register(@Body() dto: RegisterDto,) {
        return this.authService.register(dto)
    }

    @UseGuards(LocalGuard)
    @Post('/login')
    login(@Request() req) {
        return this.authService.login(req.user)
    }

    @UseGuards(JwtGuard)
    @Get('/get-auth')
    getAuth(@Request() req) {
        return req.user
    }
}