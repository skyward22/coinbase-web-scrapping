const axios = require("axios");
const cheerio = require("cheerio");

const bitcoinUrl = "https://www.coinbase.com/price/bitcoin";

const coin = { name: "", selling: "", link: "" };

const scrape = async () => {
  try {
    const { data } = await axios.get(bitcoinUrl);
    const $ = cheerio.load(data);
    const crypto = $("main#main");
    coin.name = $(crypto)
      .find(
        "h2 .TextElement__Spacer-hxkcw5-0 cicsNy Header__StyledHeader-sc-1xiyexz-0 eHyRZW"
      )
      .text();
    coin.link = bitcoinUrl;
    const selling = $(crypto)
      //   .find("div .PercentBarBuying__Text")
      .find("div .PercentBarBuying__Text-pn1f5a-2 gvPpSl")
      .first()
      .text()
      .replace(/[%]/g, "");
    const sellingNum = parseInt(selling);
    coin.selling = sellingNum;
    console.log(coin);
  } catch (err) {
    console.error(err);
  }
};

scrape();
