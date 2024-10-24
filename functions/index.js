// Se complementa con exchangerate-api.com para obtener las tasas de cambio diarias

const { onRequest } = require('firebase-functions/v2/https');
const axios = require('axios');
const functions = require('firebase-functions');

// Cache para almacenar las tasas de cambio
let exchangeRateCache = {
  data: null,
  lastUpdated: null
};

/*
Significado de los parámetros:
- from: Moneda de origen, es la moneda que quieres convertir.
- to: Moneda de destino, es la moneda a la que deseas convertir.
- amount: Monto que se va a convertir de la moneda de origen a la de destino.
*/

// Función para la conversión de moneda
exports.convertCurrency = onRequest(async (request, response) => {
  const { from, to, amount } = request.query;

  // Verifica que se hayan proporcionado los parámetros correctos
  if (!from || !to || !amount) {
    return response
      .status(400)
      .json({ error: "Parámetros faltantes: 'from', 'to', 'amount'" });
  }

  // Valida que el 'amount' sea un número válido
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    return response
      .status(400)
      .json({ error: 'El monto debe ser un número válido.' });
  }

  // Verifica si las tasas de cambio ya están en caché y si no ha pasado 1 hora
  const oneHour = 60 * 60 * 1000; // Una hora en milisegundos
  const now = Date.now();

  if (exchangeRateCache.data && now - exchangeRateCache.lastUpdated < oneHour) {
    // Usa las tasas en caché
    const conversionRate = exchangeRateCache.data.rates[to];
    if (!conversionRate) {
      return response
        .status(400)
        .json({ error: 'Moneda de destino no válida.' });
    }

    const convertedAmount = numericAmount * conversionRate;
    return response.json({
      from,
      to,
      amount: numericAmount,
      convertedAmount,
      conversionRate
    });
  }

  // Si el caché está vacío o desactualizado, realiza una nueva solicitud a la API externa
  try {
    // Obtén la API Key desde Firebase Functions Config
    const apiKey = functions.config().exchangerate.apikey;
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${from}?symbols=${to}`;

    // Solicita las tasas de cambio a la API con la clave API en los headers
    const res = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    const rates = res.data.rates;

    // Guarda las tasas en caché y la hora de actualización
    exchangeRateCache = {
      data: res.data,
      lastUpdated: now
    };

    // Calcula el monto convertido usando la tasa obtenida
    const conversionRate = rates[to];
    if (!conversionRate) {
      return response
        .status(400)
        .json({ error: 'Moneda de destino no válida.' });
    }

    const convertedAmount = numericAmount * conversionRate;
    return response.json({
      from,
      to,
      amount: numericAmount,
      convertedAmount,
      conversionRate
    });
  } catch (error) {
    return response.status(500).json({
      error: 'Error al realizar la conversión',
      details: error.message
    });
  }
});

// Para desplegar la API:
// firebase deploy --only functions
