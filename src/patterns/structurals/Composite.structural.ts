abstract class DeliveryItem {
  public item: DeliveryItem[] = [];

  add = (item: DeliveryItem): void => {
    this.item.push(item);
  };

  price(): number {
    return this.item.reduce((acc: number, i: DeliveryItem): number => (acc += i.get()), 0);
  }

  abstract get(): number;
}

let stepShop = 0;
class Shop extends DeliveryItem {
  constructor(private fee: number) {
    super();
  }

  get(): number {
    ++stepShop;
    return this.price() + this.fee;
  }
}

let stepPackage = 0;
class Package extends DeliveryItem {
  get(): number {
    ++stepPackage;
    return this.price();
  }
}

let stepProduct = 0;
class Product extends DeliveryItem {
  constructor(private productPrice: number) {
    super();
  }
  get(): number {
    ++stepProduct;
    return this.productPrice;
  }
}

const pack = new Package(); //1
pack.add(new Product(1));
pack.add(new Product(1));

const pack1 = new Package(); //1
pack1.add(new Product(1));
pack1.add(new Product(1));
pack1.add(new Product(1));

const shop = new Shop(1);
const prod = new Product(1);
shop.add(prod);
shop.add(pack);
shop.add(pack1);

console.log(shop.get() + 2);

console.log('stepShop    :', stepShop);
console.log('stepPackage :', stepPackage);
console.log('stepProduct :', stepProduct);
