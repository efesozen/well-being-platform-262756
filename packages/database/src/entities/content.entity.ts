import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'contents' })
export class Content extends BaseEntity {
  @Column()
  @Index('idx_contents_title')
  title!: string;

  @Column()
  description!: string;

  @Column({ type: 'enum', enum: ['ARTICLE', 'VIDEO', 'PODCAST'] })
  @Index('idx_contents_type')
  type!: 'ARTICLE' | 'VIDEO' | 'PODCAST';

}
