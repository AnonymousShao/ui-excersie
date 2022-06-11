export const toThousands: (number) => string = (num) => {
  return `${num}`.replace(/\d+/g, (n) => {
    return n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  })
}