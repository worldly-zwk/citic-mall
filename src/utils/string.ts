
export function normNameToMap(normName?: string) {
  const normMap: RecordAny = {};
  normName?.split(';').forEach(item => {
    const [name, value] = item.split(',');
    normMap[name] = value;
  });
  return normMap;
}

export function maskMiddle(text: string): string {
  const { length } = text;
  if (text.length <= 4) return `${text[0]}****${text.slice(-1)}`;
  const middle = Math.min((length - 2) / 2, 4);

  return `${text.slice(0, middle)}****${text.slice(-middle)}`;
}

export function pickText(html: string): string {
  return html.replace(/<[^>]+>/g,'').replace(/&nbsp;/ig,'').replace(/[\t\n]/ig,'');
}
