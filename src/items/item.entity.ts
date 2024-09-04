import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { JoinColumn, OneToOne } from 'typeorm';

import { ItemStatus } from './enums/itemStatus.enum';
import { Claim } from 'src/claims/claim.entity';

/**
 * Item Entity
 * @description Represents the schema of an Item
 */
@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 96, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  imageUrl: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  category: string;

  @Column({ type: 'varchar', length: 96, nullable: true, default: null })
  description?: string;

  @Column({
    type: 'enum',
    enum: ItemStatus,
    nullable: false,
    default: ItemStatus.UNCLAIMED,
  })
  status: ItemStatus;

  @Column({ type: 'varchar', length: 96, nullable: false })
  locationFound: string;

  @Column({ type: 'date', nullable: false })
  dateFound: Date;

  @Column({ type: 'boolean', nullable: false, default: false })
  isArchived: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Claim, (claim) => claim.item, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  claim: Claim;

  // Add any additional methods or decorators as needed
}
