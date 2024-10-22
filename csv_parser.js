const fs = require('node:fs/promises');

const originFileType = '.csv';
const originFileName = 'CADPROD';

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

async function run() {
  try {
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
  } catch (err) {
    console.log(err);
  }
}

run();
