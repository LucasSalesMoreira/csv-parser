const fs = require('node:fs/promises');

function getColumnsArray(data) {
  return data
    .split('\n')[0]
    .replaceAll('"', '')
    .split(';');
}

function getLinesArray(data) {
  let valuesArray = data.split('\n');
  valuesArray.splice(0, 1);
  return valuesArray;
}

function getColumnsOfLineArray(line) {
  return line.replaceAll('"', '').split(';').map(c => c.trim());
}

async function extractProduct(originFileName, originFileType) {
  const data = await fs.readFile(`${originFileName}${originFileType}`, { encoding: 'utf8' });
  const columns = getColumnsArray(data);
  const lines = getLinesArray(data);
  const objectArray = [];

  for (let l = 0; l < lines.length; l++) {
    let columnsOfLineArray = getColumnsOfLineArray(lines[l]);
    let codProdField = columnsOfLineArray[columns.indexOf('cod_prod')];
    let codFabField = columnsOfLineArray[columns.indexOf('cod_fab')];
    let codBarraField = columnsOfLineArray[columns.indexOf('cod_barra')];
    let desProdField = columnsOfLineArray[columns.indexOf('des_prod')];
    let valCompraField = columnsOfLineArray[columns.indexOf('val_compra')];
    let valCustoField = columnsOfLineArray[columns.indexOf('val_custo')];
    let precoField = columnsOfLineArray[columns.indexOf('preco1')];
    objectArray.push({
      codProd: codProdField != undefined ? codProdField : null,
      codFab: codFabField != undefined ? codFabField : null,
      desProd: desProdField != undefined ? desProdField : null,
      valCompra: valCompraField != undefined ? valCompraField : null,
      valCusto: valCustoField != undefined ? valCustoField : null,
      preco: precoField != undefined ? precoField : null
    });
  }
  await fs.writeFile(`${originFileName}.json`, JSON.stringify(objectArray));
}

async function extractSupplier(originFileName, originFileType) {
  const data = await fs.readFile(`${originFileName}${originFileType}`, { encoding: 'utf8' });
  const columns = getColumnsArray(data);
  const lines = getLinesArray(data);
  const objectArray = [];

  for (let l = 0; l < lines.length; l++) {
    let columnsOfLineArray = getColumnsOfLineArray(lines[l]);
    let razsocField = columnsOfLineArray[columns.indexOf('razsoc')];
    let fantasiaField = columnsOfLineArray[columns.indexOf('fantasia')];
    let endforField = columnsOfLineArray[columns.indexOf('endfor')];
    let telfor1Field = columnsOfLineArray[columns.indexOf('telfor1')];
    let telfor2Field = columnsOfLineArray[columns.indexOf('telfor2')];
    let faxforField = columnsOfLineArray[columns.indexOf('faxfor')];
    let baiforField = columnsOfLineArray[columns.indexOf('baifor')];
    let cidforField = columnsOfLineArray[columns.indexOf('cidfor')];
    let estforField = columnsOfLineArray[columns.indexOf('estfor')];
    let cepforField = columnsOfLineArray[columns.indexOf('cepfor')];
    let cgcforField = columnsOfLineArray[columns.indexOf('cgcfor')];
    let represField = columnsOfLineArray[columns.indexOf('repres')];
    
    objectArray.push({
      corporateReason: razsocField != undefined ? razsocField : null,
      name: fantasiaField != undefined ? fantasiaField : null,
      address: endforField != undefined ? endforField : null,
      phone: telfor1Field != undefined ? telfor1Field : null,
      district: baiforField != undefined ? baiforField : null,
      city: cidforField != undefined ? cidforField : null,
      state: estforField != undefined ? estforField : null,
      cep: cepforField != undefined ? cepforField : null,
      legalDocument: cgcforField != undefined ? cgcforField : null,
      representative: represField != undefined ? represField : null
    });
  }
  await fs.writeFile(`${originFileName}.json`, JSON.stringify(objectArray));
}

async function run() {
  try {
    const originFileType = '.csv';
    await extractProduct('CADPROD', originFileType);
    await extractSupplier('', originFileType);
  } catch (err) {
    console.log(err);
  }
}

run();
