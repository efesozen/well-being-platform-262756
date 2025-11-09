import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'activities' })
export class Activity extends BaseEntity {
  @Column()
  @Index('idx_activities_activity_type')
  activity_type!: string;

  @Column({ type: 'integer' })
  duration!: number;

  @Column({ type: 'timestamp with time zone' })
  @Index('idx_activities_date')
  date!: Date;


@Column({ name: 'user_id' })
  user_id!: string;

  @Index('idx_activities_user_id')
  @ManyToOne('User', 'activities')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
