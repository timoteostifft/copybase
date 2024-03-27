import { Optional } from 'src/types/optional';
import { UUID } from './uuid';

export interface EntityProps {
  created_at: Date;
  updated_at?: Date | null;
}

export abstract class Entity<Props> {
  private _id: UUID;
  protected props: Props & EntityProps;

  get id() {
    return this._id;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  touch() {
    this.props.updated_at = new Date();
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true;
    }

    if (this._id.equals(entity.id)) {
      return true;
    }

    return false;
  }

  protected constructor(
    props: Props & Optional<EntityProps, 'created_at'>,
    id?: UUID,
  ) {
    this._id = id ?? new UUID();

    this.props = {
      ...props,
      created_at: props.created_at ? props.created_at : new Date(),
    };
  }
}
