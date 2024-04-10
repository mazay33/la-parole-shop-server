export default async function getPaginatedData<T>(
  model: any,
  {
    sort,
    limit,
    offset,
    include,
  }: {
    sort?: string;
    limit?: number;
    offset?: number;
    include: any;
  }
): Promise<{
  data: T[];
  totalCount: number;
}> {
  const column = sort?.replace(/^-/, "") || "id";
  const order = sort?.startsWith("-") ? "desc" : "asc";

  const skip = offset ? +offset : 0;
  const take = limit ? +limit : undefined;

  const queryOptions = {
    skip,
    take,
    orderBy: { [column]: order },
    include,
  };

  const data = await model.findMany(queryOptions);

  const totalCount: number = await model.count();

  return { data, totalCount };
}
