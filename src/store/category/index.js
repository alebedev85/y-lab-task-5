import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      active: null
    }
  }

  async loadCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json()
    const result = json.result
    const items = result.items.map(el => {
      return { title: el.title, value: el._id, _id: el._id, parent: (el.parent?._id || null) }
    })
    const tree = createTree(items);
    console.log('tree: ', tree);
    const list = [{ title: 'Все', value: '' }, ...tree];

    this.setState({
      ...this.getState(),
      list
    }, 'Загружен список категорий из АПИ');
  }
}

export default CatalogState;

function createTree(items, parent, deepLevel = 0) {
  parent = parent || null;
  let result = [];

  items.forEach((item) => {
    if (item.parent === parent) {
      item.title = '- '.repeat(deepLevel) + item.title;
      result.push(item);
      result = [...result, ...createTree(items, item.value, deepLevel + 1)];
    }
  });

  return result;
}