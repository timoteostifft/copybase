import { Optional } from 'src/types/optional';
import { Entity, EntityProps } from './entity';
import { UUID } from './uuid';

interface MetricsProps extends Optional<EntityProps, 'created_at'> {
  data: {
    charges: number;
    interval: number;
    initiated_at: Date;
    status_at: Date;
    canceled_at: Date | null;
    status: 'ACTIVE' | 'CANCELED';
    price: number;
    next_cycle: Date;
    subscriber_id: string;
  }[];
}

export class Metrics extends Entity<MetricsProps> {
  get data() {
    return this.props.data;
  }

  static create(props: MetricsProps, id?: UUID) {
    const metrics = new Metrics({ ...props }, id);
    return metrics;
  }
}
