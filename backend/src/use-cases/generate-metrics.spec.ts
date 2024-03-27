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
        canceled_at: null,
        status: 'ACTIVE' as 'ACTIVE' | 'CANCELED',
      },
      {
        ..._,
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

    const result = sut.execute({
      data,
    });

    expect(result.churn[0].percentage).toBe(40);
  });
});
