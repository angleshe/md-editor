!(function (e) {
  var t,
    n,
    o,
    i,
    c,
    d,
    l,
    a =
      '<svg><symbol id="icon-check" viewBox="0 0 1024 1024"><path d="M431.47 793.782c-11.365 0-22.332-4.378-30.589-12.286l-235.495-225.535c-17.64-16.894-18.245-44.891-1.35-62.528 16.894-17.64 44.891-18.245 62.532-1.351l201.055 192.552 364.692-443.171c15.519-18.86 43.39-21.567 62.253-6.049 18.861 15.519 21.568 43.39 6.048 62.251l-394.992 479.993c-7.821 9.504-19.248 15.319-31.534 16.047-0.874 0.052-1.748 0.078-2.621 0.078z"  ></path></symbol><symbol id="icon-arrow-right" viewBox="0 0 1024 1024"><path d="M325.048 93.511l-60.030 59.435 357.181 359.631-360.184 356.603 59.522 59.93 420.207-416.043z"  ></path></symbol></svg>',
    s = (t = document.getElementsByTagName('script'))[t.length - 1].getAttribute('data-injectcss');
  if (s && !e.__iconfont__svg__cssinject__) {
    e.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  function r() {
    d || ((d = !0), i());
  }
  (n = function () {
    var e,
      t,
      n,
      o,
      i,
      c = document.createElement('div');
    (c.innerHTML = a),
      (a = null),
      (e = c.getElementsByTagName('svg')[0]) &&
        (e.setAttribute('aria-hidden', 'true'),
        (e.style.position = 'absolute'),
        (e.style.width = 0),
        (e.style.height = 0),
        (e.style.overflow = 'hidden'),
        (t = e),
        (n = document.body).firstChild
          ? ((o = t), (i = n.firstChild).parentNode.insertBefore(o, i))
          : n.appendChild(t));
  }),
    document.addEventListener
      ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
        ? setTimeout(n, 0)
        : ((o = function () {
            document.removeEventListener('DOMContentLoaded', o, !1), n();
          }),
          document.addEventListener('DOMContentLoaded', o, !1))
      : document.attachEvent &&
        ((i = n),
        (c = e.document),
        (d = !1),
        (l = function () {
          try {
            c.documentElement.doScroll('left');
          } catch (e) {
            return void setTimeout(l, 50);
          }
          r();
        })(),
        (c.onreadystatechange = function () {
          'complete' == c.readyState && ((c.onreadystatechange = null), r());
        }));
})(window);
