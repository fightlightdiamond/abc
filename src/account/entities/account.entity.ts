import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.account)
  customer: string;
}
