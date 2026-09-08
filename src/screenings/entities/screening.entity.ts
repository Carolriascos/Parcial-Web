import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from 'typeorm';
import { RoomEntity } from './';

@Entity('screenings')
export class ScreeningEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 120 })
  item!: string;

  @Column({ type: 'int', default: 1 })
  quantity!: number;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status!: 'pending' | 'ready';

  @ManyToOne(() => RoomEntity, (rooms) => rooms.orders, {
    nullable: false,
  })
  @JoinColumn({ name: 'customer_id' })
  rooms!: RoomEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}