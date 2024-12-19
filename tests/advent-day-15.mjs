export default function () {
  const e = [...Array(5)],
    t = [0, 2, 1, 4, 3];
  let n = 0;
  return {
    put: () => {
      const o = t[n];
      return void 0 !== e[o] ? -1 : ((e[o] = {}), (n = (n + 1) % 5), o);
    },
    pop: () => {
      const o = (n - 1 + 5) % 5,
        s = t[o];
      return void 0 === e[s] ? -1 : ((e[s] = void 0), (n = o), s);
    },
    isEmpty: () => 0 === n,
  };
}
