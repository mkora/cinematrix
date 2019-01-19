export default (start, stop, step = 1) => Array.from({ length: (stop - start) / step }, (_, i) => start + (i * step));

