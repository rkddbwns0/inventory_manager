import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StoreProductEntity } from './stroe_product.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: null })
  updated_at: Date;
}
