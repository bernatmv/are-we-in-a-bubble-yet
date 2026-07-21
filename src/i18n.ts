export type Locale = 'en' | 'es';

export const copy = {
  en: {
    lang: 'en', locale: 'en_US', path: '/', otherPath: '/es/', otherLabel: 'ES', otherName: 'Ver en español',
    title: 'Are We in a Stock Market Bubble? Live Bubble Indicators',
    description: 'Is the stock market in a bubble? Check today’s Shiller CAPE, market value to GDP, margin debt, credit spreads and VIX in one daily-updated dashboard.',
    image: '/og-en.png', imageAlt: 'Are we in a stock market bubble? A daily market risk dashboard.',
    wordmark: 'ARE WE IN A BUBBLE YET?', homeLabel: 'Are we in a bubble yet? home',
    freshness: 'DATA CHECKED DAILY', shortAnswer: 'THE SHORT ANSWER',
    verdict: { YES: 'YES', MAYBE: 'MAYBE', NO: 'NO' },
    summaries: {
      YES: 'Valuations and investor leverage are stretched. Credit and sentiment decide how close the signal sits to maximum alert.',
      MAYBE: 'Some warning signs are elevated, but the evidence is not broad enough for a clear bubble call.',
      NO: 'The major valuation, leverage, and credit signals are not jointly showing bubble conditions.'
    },
    scoreAria: 'Stock market bubble pressure score', scoreLabel: 'COMPOSITE PRESSURE', cool: 'COOL', stretched: 'STRETCHED', bubble: 'BUBBLE',
    scoreCopy: 'Valuation and leverage account for 80% of the score.', readEvidence: 'READ THE EVIDENCE',
    evidenceKicker: 'THE EVIDENCE', evidenceTitle: ['Five signals.', 'One clear read.'],
    evidenceIntro: 'No single metric can call a market top. We combine slow-moving valuation and leverage data with faster credit and sentiment signals.',
    risk: 'RISK', low: 'LOW', high: 'HIGH', trend: 'HISTORICAL TREND', asOf: 'AS OF', sourceSuffix: 'SOURCE',
    methodKicker: 'HOW TO READ THIS', methodTitle: ['A temperature check,', 'not a crystal ball.'],
    methodP1: 'This stock market bubble score measures how closely today resembles historically overheated US equity markets. It does not predict when prices will turn—or whether they must.',
    methodP2: 'Each indicator is normalized from 0–100 against transparent thresholds, then weighted toward fundamentals: valuation 55%, leverage 25%, credit 12%, sentiment 8%.',
    aboutKicker: 'WHAT THE SCORE MEANS', aboutTitle: 'Are we in a stock market bubble?',
    aboutVerdict: { YES: 'The evidence says yes.', MAYBE: 'The evidence is mixed.', NO: 'The evidence says no.' },
    aboutP1: 'A bubble is not simply a market at an all-time high. It is a market where prices, leverage and confidence detach from the economic fundamentals beneath them. The composite score shows how strongly those conditions align today.',
    aboutP2: 'The Shiller CAPE and market-value-to-GDP ratio measure valuation. FINRA margin debt measures investor leverage. Corporate credit spreads and the VIX show whether credit markets and investors are relaxed about risk.',
    disclaimer: 'Built from public data. Not investment advice.', methodology: 'METHODOLOGY & DATA',
    updatedLabel: 'Last updated', datasetName: 'US stock market bubble indicators',
    datasetDescription: 'A daily-updated collection of US stock market valuation, leverage, credit and sentiment indicators.'
  },
  es: {
    lang: 'es', locale: 'es_ES', path: '/es/', otherPath: '/', otherLabel: 'EN', otherName: 'View in English',
    title: '¿Hay una burbuja bursátil? Indicadores actualizados',
    description: '¿Está la bolsa en una burbuja? Consulta CAPE de Shiller, valor de mercado frente al PIB, deuda de margen, diferenciales de crédito y VIX, actualizados a diario.',
    image: '/og-es.png', imageAlt: '¿Hay una burbuja bursátil? Panel diario de riesgo de mercado.',
    wordmark: '¿ESTAMOS EN UNA BURBUJA?', homeLabel: '¿Estamos en una burbuja? inicio',
    freshness: 'DATOS REVISADOS A DIARIO', shortAnswer: 'LA RESPUESTA CORTA',
    verdict: { YES: 'SÍ', MAYBE: 'QUIZÁ', NO: 'NO' },
    summaries: {
      YES: 'Las valoraciones y el apalancamiento de los inversores están tensionados. El crédito y el sentimiento determinan cuánto se acerca la señal a la alerta máxima.',
      MAYBE: 'Hay señales de alerta elevadas, pero la evidencia aún no es suficientemente amplia para afirmar que existe una burbuja.',
      NO: 'Las principales señales de valoración, apalancamiento y crédito no apuntan conjuntamente a una burbuja.'
    },
    scoreAria: 'Índice de presión de burbuja bursátil', scoreLabel: 'PRESIÓN COMPUESTA', cool: 'CALMA', stretched: 'TENSIÓN', bubble: 'BURBUJA',
    scoreCopy: 'La valoración y el apalancamiento representan el 80% de la puntuación.', readEvidence: 'VER LA EVIDENCIA',
    evidenceKicker: 'LA EVIDENCIA', evidenceTitle: ['Cinco señales.', 'Una lectura clara.'],
    evidenceIntro: 'Ninguna métrica puede anticipar por sí sola un techo de mercado. Combinamos valoración y apalancamiento con señales más rápidas de crédito y sentimiento.',
    risk: 'RIESGO', low: 'BAJO', high: 'ALTO', trend: 'TENDENCIA HISTÓRICA', asOf: 'DATOS DE', sourceSuffix: 'FUENTE',
    methodKicker: 'CÓMO INTERPRETARLO', methodTitle: ['Un termómetro,', 'no una bola de cristal.'],
    methodP1: 'Este índice de burbuja bursátil mide cuánto se parece el mercado estadounidense actual a periodos históricamente sobrecalentados. No predice cuándo caerán los precios, ni afirma que tengan que hacerlo.',
    methodP2: 'Cada indicador se normaliza de 0 a 100 con umbrales transparentes. La ponderación prioriza los fundamentales: valoración 55%, apalancamiento 25%, crédito 12% y sentimiento 8%.',
    aboutKicker: 'QUÉ SIGNIFICA EL ÍNDICE', aboutTitle: '¿Hay una burbuja en la bolsa?',
    aboutVerdict: { YES: 'La evidencia dice que sí.', MAYBE: 'La evidencia es mixta.', NO: 'La evidencia dice que no.' },
    aboutP1: 'Una burbuja no es simplemente un mercado en máximos históricos. Aparece cuando los precios, el apalancamiento y la confianza se separan de los fundamentos económicos. El índice compuesto muestra cuánto coinciden hoy esas condiciones.',
    aboutP2: 'El CAPE de Shiller y el valor de mercado frente al PIB miden la valoración. La deuda de margen de FINRA mide el apalancamiento. Los diferenciales de crédito corporativo y el VIX muestran cuánto riesgo perciben el crédito y los inversores.',
    disclaimer: 'Creado con datos públicos. No es asesoramiento financiero.', methodology: 'METODOLOGÍA Y DATOS',
    updatedLabel: 'Última actualización', datasetName: 'Indicadores de burbuja bursátil en Estados Unidos',
    datasetDescription: 'Colección actualizada a diario de indicadores de valoración, apalancamiento, crédito y sentimiento del mercado bursátil estadounidense.'
  }
} as const;

export const indicatorCopy = {
  es: {
    cape: { name: 'CAPE de Shiller', eyebrow: 'VALORACIÓN · 30% DEL ÍNDICE', description: 'Precio dividido por diez años de beneficios ajustados por inflación. Suaviza el ciclo económico para mostrar cuánto se paga por una capacidad de beneficio duradera.', threshold: 'Señal de burbuja por encima de 30×', change: 'Última lectura mensual' },
    buffett: { name: 'Valor de mercado / PIB', eyebrow: 'VALORACIÓN · 25% DEL ÍNDICE', description: 'Valor de las acciones estadounidenses frente a la producción económica anual. Indica cuánto paga el mercado por cada dólar que produce la economía.', threshold: 'Señal de burbuja por encima del 180%', change: 'Última lectura trimestral' },
    margin: { name: 'Deuda de margen', eyebrow: 'APALANCAMIENTO · 25% DEL ÍNDICE', description: 'Dinero que los clientes piden prestado contra sus valores. Un crecimiento rápido implica más apalancamiento y más ventas forzadas si los precios retroceden.', threshold: 'Riesgo alto por encima del 25% anual', change: 'VARIACIÓN_INTERANUAL' },
    credit: { name: 'Diferencial de crédito', eyebrow: 'CRÉDITO · 12% DEL ÍNDICE', description: 'Rentabilidad adicional que pagan las empresas estadounidenses con calificación Baa frente al bono del Tesoro a diez años. Un diferencial muy estrecho indica que los prestamistas perciben poco riesgo.', threshold: 'Complacencia por debajo del 1,80%', change: 'Los prestamistas perciben poco riesgo' },
    vix: { name: 'Volatilidad del mercado', eyebrow: 'SENTIMIENTO · 8% DEL ÍNDICE', description: 'El VIX refleja la volatilidad esperada a corto plazo del S&P 500. Lecturas excepcionalmente bajas pueden revelar complacencia entre los inversores.', threshold: 'Complacencia por debajo de 14', change: 'Calma, pero sin euforia' }
  }
} as const;

export const statusCopy = {
  en: { Extreme: 'Extreme', Elevated: 'Elevated', Complacent: 'Complacent', Neutral: 'Neutral' },
  es: { Extreme: 'Extremo', Elevated: 'Elevado', Complacent: 'Complaciente', Neutral: 'Neutral' }
} as const;
