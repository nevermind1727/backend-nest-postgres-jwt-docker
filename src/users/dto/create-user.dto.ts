import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: "user@gmail.com", description: "User's email address"})
    @IsString({message: "Must be a string"})
    @IsEmail({}, {message: "Enter an email address"})
    readonly email: string;
    @ApiProperty({example: "pass123", description: "User's password"})
    @IsString({message: "Must be a string"})
    @Length(5, 36)
    readonly password: string;
}