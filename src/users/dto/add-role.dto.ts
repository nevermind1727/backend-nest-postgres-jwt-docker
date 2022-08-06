import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class AddRoleDto {
    @ApiProperty({example: "ADMIN", description: "Role's value"})
    @IsString({message: "Must be a string"})
    readonly value: string;
    @ApiProperty({example: "5", description: "User's identifier"})
    @IsInt({message: "Must be an integer"})
    readonly userId: number;
}