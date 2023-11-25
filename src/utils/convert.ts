export function convertProduct(info: API.Product): ScrollProduct {
  return {
    id: info.id,
    name: info.name1,
    image: info.masterImg,
    price: info.mallPcPrice
  }
}
