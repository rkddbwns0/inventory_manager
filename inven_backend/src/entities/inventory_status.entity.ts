import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('inventory_status')
export class InventoryStatusEntity {
  @PrimaryColumn({ type: 'int', nullable: false })
  @ManyToOne(() => ProductEntity, (product) => product.product_id)
  product_id: ProductEntity;

  @Column({ type: 'int', nullable: false })
  current_quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_updated: Date;
}
