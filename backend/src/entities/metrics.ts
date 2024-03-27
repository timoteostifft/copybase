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

  get churn() {
    const periods: {
      gain: number;
      loss: number;
      start: Date;
      end: Date;
    }[] = [];

    const data = this.props.data;

    for (let i = 0; i < data.length; i++) {
      const isTrial = !data[i].charges;

      if (isTrial) {
        continue;
      }

      const startPeriod = periods.findIndex(
        (period) =>
          period.start <= data[i].initiated_at &&
          data[i].initiated_at <= period.end,
      );

      if (startPeriod < 0) {
        const start = new Date(data[i].initiated_at.getTime());
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        start.setHours(start.getHours() - 3);
        const end = new Date(data[i].initiated_at.getTime());
        end.setMonth(end.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
        end.setHours(end.getHours() - 3);
        periods.push({
          gain: 1,
          loss: 0,
          start,
          end,
        });
      } else {
        periods[startPeriod].gain++;
      }

      if (data[i].canceled_at) {
        const endPeriod = periods.findIndex(
          (period) =>
            period.start <= data[i].canceled_at &&
            data[i].canceled_at <= period.end,
        );

        if (endPeriod < 0) {
          const start = new Date(data[i].canceled_at.getTime());
          start.setDate(1);
          start.setHours(0, 0, 0, 0);
          start.setHours(start.getHours() - 3);

          const end = new Date(data[i].canceled_at.getTime());
          end.setMonth(end.getMonth() + 1, 0);
          end.setHours(23, 59, 59, 999);
          end.setHours(end.getHours() - 3);

          periods.push({
            gain: 0,
            loss: 1,
            start,
            end,
          });
        } else {
          periods[endPeriod].loss++;
        }
      }
    }

    periods.sort((a, b) => a.start.getTime() - b.start.getTime());

    const churns: {
      month: Date;
      percentage: number;
    }[] = [];

    for (let i = 0; i < periods.length; i++) {
      let j = i - 1;
      let total = 0;

      while (j >= 0) {
        total += periods[j].gain - periods[j].loss;
        j--;
      }

      if (!total) {
        continue;
      }

      churns.push({
        month: periods[i].start,
        percentage: (periods[i].loss / total) * 100,
      });
    }

    return churns;
  }

  static create(props: MetricsProps, id?: UUID) {
    const metrics = new Metrics({ ...props }, id);
    return metrics;
  }
}
