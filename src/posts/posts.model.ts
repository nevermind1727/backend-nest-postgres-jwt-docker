import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.model';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';

@Entity({ name: 'Posts' })
export class PostModel {
  @PrimaryGeneratedColumn()
  @ApiProperty({example: "1", description: "Unique identifier"})
  id: number;

  @Column({type: "varchar"})
  @ApiProperty({example: "Cats are so cute", description: "Post's title"})
  title: string;

  @Column({type: "varchar"})
  @ApiProperty({example: "I like cats so mutch", description: "Post's content"})
  content: string;

  @Column({type: "varchar"})
  @ApiProperty({example: "photo.jpg", description: "Image"})
  image: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User
}