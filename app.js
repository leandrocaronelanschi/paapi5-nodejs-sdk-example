var ProductAdvertisingAPIv1 = require('paapi5-nodejs-sdk');
var defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;

var searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();
var api = new ProductAdvertisingAPIv1.DefaultApi();

// Substitua <SUA CHAVE DE ACESSO> e <SUA CHAVE SECRETA> pelas suas chaves
defaultClient.accessKey = '<AKPAWRSNKZ1755809835>';
defaultClient.secretKey = '<Y2E0wxYsYuJj+CtM0Amkn0KkgDbNVZ3ZkZFUJbLH>';

// Substitua <SUA TAG DE PARCEIRO> pela sua tag real
searchItemsRequest['PartnerTag'] = '<webshop027-20>';

function onSuccess(data) {
  console.log('API chamada com sucesso.');
  var searchItemsResponse = ProductAdvertisingAPIv1.SearchItemsResponse.constructFromObject(data);
  console.log('Resposta Completa: \n' + JSON.stringify(searchItemsResponse, null, 1));
  if (searchItemsResponse['SearchResult'] !== undefined) {
    console.log('Imprimindo a Informação do Primeiro Item no SearchResult:');
    var item_0 = searchItemsResponse['SearchResult']['Items'][0];
    if (item_0 !== undefined) {
      if (item_0['ASIN'] !== undefined) {
        console.log('ASIN: ' + item_0['ASIN']);
      }
      if (item_0['DetailPageURL'] !== undefined) {
        console.log('DetailPageURL: ' + item_0['DetailPageURL']);
      }
      if (
        item_0['ItemInfo'] !== undefined &&
        item_0['ItemInfo']['Title'] !== undefined &&
        item_0['ItemInfo']['Title']['DisplayValue'] !== undefined
      ) {
        console.log('Título: ' + item_0['ItemInfo']['Title']['DisplayValue']);
      }
      if (
        item_0['Offers'] !== undefined &&
        item_0['Offers']['Listings'] !== undefined &&
        item_0['Offers']['Listings'][0]['Price'] !== undefined &&
        item_0['Offers']['Listings'][0]['Price']['DisplayAmount'] !== undefined
      ) {
        console.log('Preço de Compra: ' + item_0['Offers']['Listings'][0]['Price']['DisplayAmount']);
      }
    }
  }
  if (searchItemsResponse['Errors'] !== undefined) {
    console.log('Erros:');
    console.log('Resposta Completa de Erro: ' + JSON.stringify(searchItemsResponse['Errors'], null, 1));
    console.log('Imprimindo 1º Erro:');
    var error_0 = searchItemsResponse['Errors'][0];
    console.log('Código do Erro: ' + error_0['Code']);
    console.log('Mensagem de Erro: ' + error_0['Message']);
  }
}

function onError(error) {
  console.log('Erro ao chamar a PA-API 5.0!');
  console.log('Imprimindo Objeto de Erro Completo:\n' + JSON.stringify(error, null, 1));
  console.log('Código de Status: ' + error['status']);
  if (error['response'] !== undefined && error['response']['text'] !== undefined) {
    console.log('Objeto de Erro: ' + JSON.stringify(error['response']['text'], null, 1));
  }
}


// No seu novo arquivo app.js
api.searchItems(searchItemsRequest).then(
  function(data) {
    console.log('API chamada com sucesso. Verifique a resposta abaixo:');
    onSuccess(data);
  },
  function(error) {
    console.log('Ocorreu um erro. Verifique a resposta abaixo:');
    onError(error);
  }
);