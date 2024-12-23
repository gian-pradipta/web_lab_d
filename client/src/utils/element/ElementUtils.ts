namespace ElementUtils {
    export function isOverflowing(element : HTMLElement | null) {
        if (!element) {
          throw new Error("Element is required.");
        }
        const hasHorizontalOverflow = element.scrollWidth > element.clientWidth;
        const hasVerticalOverflow = element.scrollHeight > element.clientHeight;
        return hasHorizontalOverflow || hasVerticalOverflow;
      }
}