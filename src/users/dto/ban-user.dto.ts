import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class BanUserDto {
    @ApiProperty({example: "5", description: "User's identifier"})
    @IsInt({message: "Must be an integer"})
    readonly userId: number;
    @ApiProperty({example: "I don't like this guy", description: "Ban reason"})
    @IsString({message: "Must be a string"})
    readonly banReason: string;
}