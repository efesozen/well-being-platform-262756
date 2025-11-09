import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'well_being_plans' })
export class Wellbeingplan extends BaseEntity {
  @Column({ type: 'jsonb' })
  plan_details!: Record<string, unknown>;


@Column({ name: 'user_id' })
  user_id!: string;

  @Index('idx_well_being_plans_user_id')
  @ManyToOne('User', 'wellbeingplans')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
