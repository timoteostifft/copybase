import { Metrics } from 'src/entities/metrics';

interface GenerateMetricsUseCaseRequest {
  data: {
    charges: number;
    interval: number;
    initiated_at: Date;
    status: 'ACTIVE' | 'CANCELED';
    status_at: Date;
    canceled_at: Date | null;
    price: number;
    next_cycle: Date;
    subscriber_id: string;
  }[];
}

export class GenerateMetricsUseCase {
  execute({ data }: GenerateMetricsUseCaseRequest) {
    const metrics = Metrics.create({
      data,
    });

    return {
      churn: metrics.churn,
    };
  }
}
