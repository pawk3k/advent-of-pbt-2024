export default function (e) {
  const t = [
      "\u2709\ufe0f",
      "\ud83e\uddfa",
      "\ud83c\udf84",
      "\ud83d\udd14",
      "\ud83d\udd6f\ufe0f",
      "\u2b50",
      "\ud83e\udd8c",
      "\u26c4",
      "\ud83d\udef7",
      "\u2744\ufe0f",
      "\ud83c\udfbf",
      "\u2728",
      "\ud83e\udd29",
      "\ud83e\udd73",
      "\ud83c\udf88",
      "\ud83e\ude80",
      "\ud83c\udfae",
      "\ud83c\udfb2",
      "\u265f\ufe0f",
      "\ud83d\udc9d",
      "\ud83c\udf80",
      "\ud83e\udde6",
      "\ud83c\udf85",
      "\ud83e\udd36",
      "\ud83c\udf81",
    ],
    n = t.length ** 12,
    r = [];
  for (let i = e.length; i > 0; i -= 12) {
    const n = e.slice(Math.max(0, i - 12), i);
    let o = 0;
    for (const e of n) (o *= t.length), (o += t.indexOf(e));
    r.push(o);
  }
  let o = [...r, 0],
    a = 0;
  for (o[a] += 1; o[a] >= n; ) (o[a] = 0), (a += 1), (o[a] += 1);
  0 === o[o.length - 1] && (o = o.slice(0, o.length - 1)), o.reverse();
  const s = [];
  for (let i = 0; i !== o.length; ++i) {
    let e = o[i].toString(25);
    0 !== i && (e = e.padStart(12, "0"));
    for (const n of e) s.push(t["0123456789abcdefghijklmno".indexOf(n)]);
  }
  return s;
}
