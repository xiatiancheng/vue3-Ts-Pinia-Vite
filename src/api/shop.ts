export interface IProduct {
    id: number;
    title: string;
    price: number;
    inventory: number;
  }
  
  const _products: IProduct[] = [
    { id: 1, title: "苹果13", price: 6999, inventory: 3 },
    { id: 2, title: "小米12", price: 5990, inventory: 5 },
    { id: 3, title: "魅族12", price: 5399, inventory: 6 },
  ];
  
  // 获取商品列表
  export const getProducts = async () => {
    await wait(100);
    return _products;
  };
  
  // 结算商品
  export const buyProducts = async () => {
    await wait(100);
    return Math.random() > 0.5;
  };
  
  async function wait(delay: number) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }
