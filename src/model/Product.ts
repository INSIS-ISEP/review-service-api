interface IProduct {
  productID?: number;
  sku: string;
  designation?: string;
  description?: string;
}

export class Product implements IProduct {
  productID?: number;
  sku: string;
  designation?: string;
  description?: string;

  constructor(
    sku: string,
    productID: number,
    designation?: string,
    description?: string,
  ) {
    this.productID = productID;
    this.sku = sku;
    this.designation = designation;
    this.description = description;
  }
}
