module.exports = (req, res) => {
  const products = require('./../products.json')[0]

  let { data } = products

  data.item.imageName = data.item.imageName.replace('//www.itelios.com.br/arquivos/imagens/', 'images/')

  data.item.productInfo.paymentConditions = data.item.productInfo.paymentConditions.replace('ou até', 'ou')
  data.item = installment (data.item)

  for (let rec of data.recommendation) {
    rec.imageName = rec.imageName.replace('//www.itelios.com.br/arquivos/imagens/', 'images/')
    rec.productInfo.paymentConditions = rec.productInfo.paymentConditions.replace('ou até', 'ou')
    rec = installment (rec)
  }
  
  res.render('index', { product: data })
}

const installment = object => { 
  object.productInfo.installmentStart = object.productInfo.paymentConditions.match(/^[^\d]+/g)
  object.productInfo.installmentMiddle = object.productInfo.paymentConditions.match(/[\d]+x de R\$ [\d]+.[\d]+,[\d]+/g)
  object.productInfo.installmentEnd = object.productInfo.paymentConditions.match(/[^\d]+$/g)

  return object
}