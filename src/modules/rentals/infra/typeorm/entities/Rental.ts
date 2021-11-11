import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('rentals')
class Rental {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  car_id: string;

  @Column('timestamp')
  start_date: Date;

  @Column('timestamp')
  end_date: Date;

  @Column('timestamp')
  expected_return_date: Date;

  @Column('numeric')
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Rental };
