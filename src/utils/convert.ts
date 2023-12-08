export function convertProduct(info: API.Product): ProductItem {
  return {
    id: info.id,
    name: info.name1,
    image: info.masterImg,
    price: info.mallPcPrice
  }
}
