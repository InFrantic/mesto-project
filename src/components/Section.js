export default class Section {
  constructor({ renderer, items }, containerSelector) {
    this.renderer = renderer;
    this.containerSelector = containerSelector;
    this.items = items;
  }

  rendererItems(items) {
    items.forEach((item) => {
      this.renderer(item);
    });
  }
  addItem(item) {
    this.containerSelector.prepend(item);
  }
}
