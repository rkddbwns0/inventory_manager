import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('delivery_product')
export class DeliveryProductEntity {
  @PrimaryGeneratedColumn()
  delivery_id: number;

  @ManyToOne(() => ProductEntity, (product) => product.product_id)
  product_id: ProductEntity;

  @Column({ type: 'varchar', length: 100, nullable: false })
  destination: string;

  @Column({ type: 'text', default: '' })
  note: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  delivery_date: Date;
}
