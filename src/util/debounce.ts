export function debounce(func: () => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => func(), delay);
  };
}
