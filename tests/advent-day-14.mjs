export default function () {
  return {
    compress: function (e) {
      const t = [...e];
      if (0 === t.length) return "";
      let n = "",
        r = 1,
        s = t[0];
      for (let o = 1; o < t.length; ++o)
        t[o] === s ? (r += 1) : ((n += `${r}${s}`), (s = t[o]), (r = 1));
      return (n += `${r}${s}`), n;
    },
    decompress: function (e) {
      const t = /(\d+)(.)/gmu;
      let n = null,
        r = "";
      for (; (n = t.exec(e)); ) {
        const e = [...n[0]],
          t = Number(e.slice(0, -1));
        r += e.at(-1).repeat(t);
      }
      return r;
    },
  };
}
