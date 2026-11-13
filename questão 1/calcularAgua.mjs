/** Calcula a estimativa didática de 35 mL de água por kg de peso. */
export function calcularConsumoAgua(entrada) {
  const texto = String(entrada ?? '').trim();
  if (texto === '') return { valido: false, erro: 'Informe seu peso em quilogramas.' };
  const normalizado = texto.replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(normalizado)) {
    return { valido: false, erro: 'Digite um peso válido maior que zero.' };
  }
  const peso = Number(normalizado);
  if (!Number.isFinite(peso) || peso <= 0) {
    return { valido: false, erro: 'Digite um peso válido maior que zero.' };
  }
  return { valido: true, litros: (peso * 35) / 1000 };
}
