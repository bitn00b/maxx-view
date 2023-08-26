export function updateBnbPrice(): Promise<number> {
  return fetch('https://api.coincap.io/v2/assets/binance-coin')
    .then(r => r.json()).then(j => Number(j.data.priceUsd));
}

export function updateEthPrice(): Promise<number> {
  return fetch('https://api.coincap.io/v2/assets/ethereum')
    .then(r => r.json()).then(j => Number(j.data.priceUsd));
}

/*
const coinPricesWS = new WebSocket('wss://ws.coincap.io/prices?assets=binance-coin,ethereum')

coinPricesWS.onmessage = function (msg) {
  const bnbPrice = +JSON.parse(msg.data)['binance-coin'];

  if (bnbPrice) {
    console.info({
      bnbPrice
    });

    bscPrice.set(
      bnbPrice
    );
  }

  const ethPriceValue = +JSON.parse(msg.data)['ethereum'];

  if (ethPriceValue) {
    console.info({
      ethPriceValue
    });

    ethPrice.set(
      ethPriceValue
    );
  }
}*/
