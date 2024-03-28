import { Optional } from 'src/types/optional';
import { Entity, EntityProps } from './entity';
import { UUID } from './uuid';

interface MetricsProps extends Optional<EntityProps, 'created_at'> {
  data: {
    charges: number;
    interval: number;
    initiated_at: Date;
    status: string;
    status_at: Date;
    canceled_at: Date | null;
    price: number;
    next_cycle: Date;
    subscriber_id: string;
  }[];
}

export class Metrics extends Entity<MetricsProps> {
  get data() {
    return this.props.data;
  }

  get generate() {
    const periods = this.periods();

    const metrics: {
      month: Date;
      churn: number;
      mrr: number;
    }[] = [];

    for (let i = 0; i < periods.length; i++) {
      let j = 0;
      let subscriptions = 0;
      let revenue = 0;

      while (j <= i) {
        subscriptions +=
          periods[j].subscriptions.gain - periods[j].subscriptions.loss;
        revenue += periods[j].revenue.gain - periods[j].revenue.loss;
        j++;
      }

      metrics.push({
        month: periods[i].start,
        churn:
          (periods[i].subscriptions.loss /
            (subscriptions + periods[i].subscriptions.loss)) *
          100,
        mrr: revenue,
      });
    }

    return metrics;
  }

  private periods() {
    const data = this.props.data;

    const periods: {
      subscriptions: {
        gain: number;
        loss: number;
      };
      revenue: {
        gain: number;
        loss: number;
      };
      start: Date;
      end: Date;
    }[] = [];

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

      const price =
        data[i].interval / 365 === 1 ? data[i].price / 12 : data[i].price;

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
          subscriptions: {
            gain: 1,
            loss: 0,
          },
          revenue: {
            gain: price,
            loss: 0,
          },
          start,
          end,
        });
      } else {
        periods[startPeriod].subscriptions.gain++;
        periods[startPeriod].revenue.gain += price;
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
            subscriptions: {
              gain: 0,
              loss: 1,
            },
            revenue: {
              gain: 0,
              loss: price,
            },
            start,
            end,
          });
        } else {
          periods[endPeriod].subscriptions.loss++;
          periods[endPeriod].revenue.loss += price;
        }
      }
    }

    return periods.sort((a, b) => a.start.getTime() - b.start.getTime());
  }

  static create(props: MetricsProps, id?: UUID) {
    const metrics = new Metrics({ ...props }, id);
    return metrics;
  }
}
