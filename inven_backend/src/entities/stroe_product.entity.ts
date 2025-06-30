import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CompaniesEntity } from './companies.entity';
import { UsersEntity } from './users.entity';

@Entity('store_product')
export class StoreProductEntity {
  @PrimaryGeneratedColumn()
  store_id: number;

  @ManyToOne(() => ProductEntity, (product) => product.product_id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  product_id: ProductEntity;

  @ManyToOne(() => CompaniesEntity, (company) => company.company_id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  company_id: CompaniesEntity;

  @ManyToOne(() => UsersEntity, (users) => users.user_id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  requester: UsersEntity;

  @ManyToOne(() => UsersEntity, (users) => users.user_id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  approver: UsersEntity;

  @Column({ type: 'int', nullable: false })
  status: number;

  @Column({
    type: 'enum',
    enum: ['req', 'app', 'rec', 'com', 'rej'],
    default: 'req',
    nullable: false,
  })
  status_type: string;

  @Column({ type: 'text', default: '' })
  note: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
