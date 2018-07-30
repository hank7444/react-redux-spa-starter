export function formatMoney(money) {

  if (!money) {
    return null;
  }

  const formatter = new Intl.NumberFormat('en-US');

  return formatter.format(money);
}
