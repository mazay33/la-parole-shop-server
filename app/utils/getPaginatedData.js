module.exports = async function getPaginatedData(
  model,
  { sort, limit, offset, include }
) {
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

  const totalCount = await model.count();

  return { data, totalCount };
};
