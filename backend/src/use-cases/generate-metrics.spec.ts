import { Metrics } from 'src/entities/metrics';
import { GenerateMetricsUseCase } from './generate-metrics';
import { UUID } from 'src/entities/uuid';

let sut: GenerateMetricsUseCase;

describe('generate metrics', () => {
  beforeEach(() => {
    sut = new GenerateMetricsUseCase();
  });

  it('should be able to generate the data churn rate by month', async () => {
    const data: Metrics['data'] = [];

    const past = new Date();
    past.setMonth(past.getMonth() - 1);

    const future = new Date();
    future.setMonth(future.getMonth() + 1);

    const _ = {
      charges: 1,
      initiated_at: past,
      canceled_at: new Date(),
      interval: 30,
      next_cycle: future,
      price: 240.0,
      status_at: new Date(),
      subscriber_id: new UUID().value,
      status: 'CANCELED' as 'ACTIVE' | 'CANCELED',
    };

    const array = [
      _,
      _,
      {
        ..._,
        interval: 365,
        canceled_at: null,
        status: 'ACTIVE' as 'ACTIVE' | 'CANCELED',
      },
      {
        ..._,
        interval: 365,
        canceled_at: null,
        status: 'ACTIVE' as 'ACTIVE' | 'CANCELED',
      },
      {
        ..._,
        canceled_at: null,
        status: 'ACTIVE' as 'ACTIVE' | 'CANCELED',
      },
    ];

    data.push(...array);

    const result = await sut.execute({
      data,
    });

    expect(result.metrics[0].churn).toBe(0);
    expect(result.metrics[0].mrr).toBe(760);
    expect(result.metrics[1].churn).toBe(40);
    expect(result.metrics[1].mrr).toBe(280);
  });
});
