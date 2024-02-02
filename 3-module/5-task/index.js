function getMinMax(str) {
  return str.split(" ").reduce(
    (acc, item) => {
      const num = Number(item);
      const isNan = Number.isNaN(num);

      if (isNan) {
        return acc;
      }

      acc.min = Math.min(acc.min, num);
      acc.max = Math.max(acc.max, num);
      return acc;
    },
    {
      max: Number.NEGATIVE_INFINITY,
      min: Number.POSITIVE_INFINITY,
    }
  );
}
