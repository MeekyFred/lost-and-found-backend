import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
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
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'enum',
    enum: ClaimStatus,
    nullable: false,
    default: ClaimStatus.SUBMITTED,
  })
  status: ClaimStatus;

  @Column({
    type: 'date',
    nullable: false,
  })
  dateLost: Date;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.claims, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @OneToOne(() => Item, { cascade: true })
  @JoinColumn({ name: 'itemId' }) // Ensures Claim holds the foreign key
  item: Item;
}
