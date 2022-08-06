import { ApiProperty } from '@nestjs/swagger';
import { PostModel } from 'src/posts/posts.model';
import { Role } from 'src/roles/roles.model';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({example: "1", description: "Unique identifier"})
  id: number;

  @Column({type: "varchar", unique: true})
  @ApiProperty({example: "user@gmail.com", description: "User's email address"})
  email: string;

  @Column({type: "varchar"})
  @ApiProperty({example: "pass123", description: "User's password"})
  password: string;

  @Column({ type: "boolean", default: false })
  @ApiProperty({example: "true", description: "Banned user or not"})
  banned: boolean;

  @Column({ type: "varchar", nullable: true })
  @ApiProperty({example: "Trash talking", description: "User's ban reason"})
  banReason: string | null;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[]

  @OneToMany(type => PostModel, post => post.user)
  posts: PostModel[];
}