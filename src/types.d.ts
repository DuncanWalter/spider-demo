/**
 * Anyone know of a way to actually
 * get types out of css modules?
 * I'd love to see that.
 *
 * Anyway, note that types are built into
 * `spider-store`- no need to add extra
 * packages or declarations if you don't want
 * to.
 */
declare module '*.css' {
  const styles: { [key: string]: string }
  export = styles
}
