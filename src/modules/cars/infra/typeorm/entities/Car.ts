import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Category } from './Category';

@Entity('cars')
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('numeric')
  daily_rate: number;

  @Column('boolean')
  available: boolean;

  @Column()
  license_plate: string;

  @Column('numeric')
  fine_amount: number;

  @Column()
  brand: string;

  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.available = true;
    }
  }
}

export { Car };
