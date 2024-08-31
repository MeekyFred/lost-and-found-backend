import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ManyToOne, OneToOne } from 'typeorm';

import { ClaimStatus } from './enums/claimStatus.enum';
import { Item } from 'src/items/item.entity';
import { User } from 'src/users/user.entity';

/**
 * Claim Entity
 * @description Represents the schema of a claim
 */
@Entity()
export class Claim {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({
    type: 'enum',
    enum: ClaimStatus,
    nullable: false,
    default: ClaimStatus.SUBMITTED,
  })
  status: ClaimStatus;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.claims, { eager: true })
  readonly author: User;

  @OneToOne(() => Item, (item) => item.claim)
  readonly item: Item;
}
