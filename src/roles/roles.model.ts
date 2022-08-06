import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Roles' })
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty({example: "1", description: "Unique identifier"})
  id: number;

  @Column({type: "varchar", unique: true})
  @ApiProperty({example: "ADMIN", description: "Role value"})
  value: string;

  @Column({type: "varchar"})
  @ApiProperty({example: "Administrator", description: "Role's description"})
  description: string;
}