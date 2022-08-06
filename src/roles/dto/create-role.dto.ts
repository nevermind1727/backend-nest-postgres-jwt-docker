import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({example: "USER", description: "Role value"})
    @IsString({message: "Must be a string"})
    readonly value: string;
    @ApiProperty({example: "Default user", description: "Role's description"})
    @IsString({message: "Must be a string"})
    readonly description: string;
}