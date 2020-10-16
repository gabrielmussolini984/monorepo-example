module.exports.transaction = async event => {
  console.log("Entrou na função")
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Transação"
      },
      null,
      2
    )
  }
}