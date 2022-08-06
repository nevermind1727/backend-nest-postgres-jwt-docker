import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreatePostDto {
    @ApiProperty({example: "Cats are so cute", description: "Post's title"})
    @IsString({message: "Must be a string"})
    readonly title: string;
    @ApiProperty({example: "I like cats so mutch", description: "Post's content"})
    @IsString({message: "Must be a string"})
    readonly content: string;
}