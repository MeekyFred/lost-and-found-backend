import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { JoinColumn, OneToMany } from 'typeorm';

import { Claim } from 'src/claims/claim.entity';

/**
 * User Entity
 * @description Represents the schema of a User
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'varchar', length: 96, nullable: false })
  readonly name: string;

  @Column({ type: 'varchar', length: 96, nullable: false, unique: true })
  readonly email: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  readonly password: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToMany(() => Claim, (claims) => claims.author)
  @JoinColumn()
  readonly claims: Claim[];
}
