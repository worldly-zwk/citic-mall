
export function normNameToMap(normName?: string) {
  const normMap: RecordAny = {};
  normName?.split(';').forEach(item => {
    const [name, value] = item.split(',');
    normMap[name] = value;
  });
  return normMap;
}