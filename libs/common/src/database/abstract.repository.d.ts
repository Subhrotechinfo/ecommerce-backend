import { Model, QueryFilter, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema";
import { Logger } from "@nestjs/common";
export declare abstract class AbstractRepository<
  TDocument extends AbstractDocument,
> {
  protected readonly model: Model<TDocument>;
  protected abstract readonly logger: Logger;
  constructor(model: Model<TDocument>);
  create(document: Omit<TDocument, "_id">): Promise<TDocument>;
  findOne(filterQuery: QueryFilter<TDocument>): Promise<TDocument>;
  findOneAndUpdate(
    filterQuery: QueryFilter<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument>;
  find(filterQuery: QueryFilter<TDocument>): Promise<TDocument[]>;
  findOneAndDelete(
    filterQuery: QueryFilter<TDocument>,
  ): Promise<TDocument | null>;
}
//# sourceMappingURL=abstract.repository.d.ts.map
