import { Exclude } from 'class-transformer';
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
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  readonly firstName: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 96, nullable: false, unique: true })
  readonly email: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  readonly phoneNumber: string;

  @Column({ type: 'varchar', length: 96, nullable: true, default: null })
  @Exclude()
  readonly password?: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  @Exclude()
  googleId?: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToMany(() => Claim, (claims) => claims.author)
  @JoinColumn()
  claims: Claim[];
}
