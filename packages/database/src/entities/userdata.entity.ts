import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'user_data' })
export class Userdata extends BaseEntity {
  @Column({ type: 'jsonb', nullable: true })
  goal_setting?: Record<string, unknown>;

  @Column({ type: 'jsonb', nullable: true })
  progress_tracking?: Record<string, unknown>;


@Column({ name: 'user_id' })
  user_id!: string;

  @Index('idx_user_data_user_id')
  @ManyToOne('User', 'userdatas')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
