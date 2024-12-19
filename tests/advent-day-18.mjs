export default function (t) {
  const n = { x: 0, y: 0 },
    o = [...t],
    r = [n];
  let s = n;
  for (; 0 !== o.length; ) {
    let t = 0,
      n = e(s, o[0]);
    for (let r = 1; r < o.length; ++r) {
      const a = e(s, o[r]);
      a < n && ((t = r), (n = a));
    }
    (s = o[t]), o.splice(t, 1), r.push(s);
  }
  return r.push(n), r;
}
function e(e, t) {
  return Math.abs(e.x - t.x) + Math.abs(e.y - t.y);
}
