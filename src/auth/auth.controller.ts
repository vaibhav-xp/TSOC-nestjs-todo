import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  @ApiOperation({
    description: "To register a new user with email.",
    summary: "Register a User with details."
  })
  async create(@Body() createAuthDto: RegisterUserDto) {
    return this.authService.register(createAuthDto);
  }

  @Post("login")
  @ApiOperation({
    description: "Login with email",
    summary: "Endpoint to login with user email and password."
  })
  login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }
}
