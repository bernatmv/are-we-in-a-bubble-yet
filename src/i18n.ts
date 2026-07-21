export type Locale = 'en' | 'es';

export const copy = {
  en: {
    lang: 'en', locale: 'en_US', path: '/', otherPath: '/es/', otherLabel: 'ES', otherName: 'Ver en español',
    title: 'Are We in a Stock Market Bubble? Live Bubble Indicators',
    description: 'Is the market in a bubble? Check Shiller CAPE, market value to GDP, margin debt, household equity allocation, credit spreads and VIX daily.',
    image: '/og-en.png', imageAlt: 'Are we in a stock market bubble? A daily market risk dashboard.',
    wordmark: 'ARE WE IN A BUBBLE YET?', homeLabel: 'Are we in a bubble yet? home',
    freshness: 'DATA CHECKED DAILY', shortAnswer: 'THE SHORT ANSWER',
    verdict: { YES: 'YES', PROBABLY: 'PROBABLY', MAYBE: 'MAYBE', NOT_YET: 'NOT YET', NO: 'NO' },
    summaries: {
      YES: 'The evidence is broad and unusually stretched. This looks like bubble territory, even if no gauge can call the top.',
      PROBABLY: 'Several independent warning signs are flashing. The market looks more bubbly than merely expensive.',
      MAYBE: 'The evidence is genuinely mixed. Some gauges are hot, while others have not joined the party.',
      NOT_YET: 'A few ingredients are warming up, but the full bubble recipe is not in the oven yet.',
      NO: 'Valuation, leverage, positioning and risk appetite are not jointly showing bubble conditions.'
    },
    scoreAria: 'Stock market bubble pressure score', scoreLabel: 'COMPOSITE PRESSURE', cool: 'COOL', stretched: 'STRETCHED', bubble: 'BUBBLE',
    scoreCopy: 'Valuation and leverage account for 70% of the score.', readEvidence: 'READ THE EVIDENCE',
    confidenceLabel: 'DECISION CONFIDENCE', confidenceHigh: 'HIGH AGREEMENT', confidenceMedium: 'MIXED AGREEMENT', confidenceLow: 'LOW AGREEMENT',
    confidenceHelp: 'Measures signal agreement and distance from a decision boundary—not the odds of a crash.',
    confidenceCopy: { high: 'The gauges mostly tell the same story.', medium: 'The gauges agree directionally, with meaningful dissent.', low: 'The gauges disagree. Treat the headline with extra caution.' },
    evidenceKicker: 'THE EVIDENCE', evidenceTitle: ['Six signals.', 'One honest read.'],
    evidenceIntro: 'No single metric can call a market top. We combine valuation, leverage and household positioning with faster credit and sentiment signals.',
    risk: 'RISK', low: 'LOW', high: 'HIGH', trend: 'HISTORICAL TREND', asOf: 'AS OF', sourceSuffix: 'SOURCE',
    methodKicker: 'HOW TO READ THIS', methodTitle: ['A temperature check,', 'not a crystal ball.'],
    methodP1: 'This stock market bubble score measures how closely today resembles historically overheated US equity markets. It does not predict when prices will turn—or whether they must.',
    methodP2: 'Each indicator is normalized from 0–100 against transparent thresholds, then weighted toward fundamentals: valuation 45%, leverage 25%, positioning 10%, credit 12%, sentiment 8%.',
    aboutKicker: 'WHAT THE SCORE MEANS', aboutTitle: 'Are we in a stock market bubble?',
    aboutVerdict: { YES: 'The evidence says yes.', PROBABLY: 'The evidence says probably.', MAYBE: 'The evidence is mixed.', NOT_YET: 'The evidence says not yet.', NO: 'The evidence says no.' },
    aboutP1: 'A bubble is not simply a market at an all-time high. It is a market where prices, leverage and confidence detach from the economic fundamentals beneath them. The composite score shows how strongly those conditions align today.',
    aboutP2: 'The Shiller CAPE and market-value-to-GDP ratio measure valuation. FINRA margin debt measures leverage. Household equity allocation captures positioning, while credit spreads and the VIX measure risk appetite.',
    disclaimer: 'Built from public data. Not investment advice.', methodology: 'METHODOLOGY & DATA', explore: 'EXPLORE THE SIGNALS',
    updatedLabel: 'Last updated', datasetName: 'US stock market bubble indicators',
    datasetDescription: 'A daily-updated collection of US stock market valuation, leverage, positioning, credit and sentiment indicators.'
  },
  es: {
    lang: 'es', locale: 'es_ES', path: '/es/', otherPath: '/', otherLabel: 'EN', otherName: 'View in English',
    title: '¿Hay una burbuja bursátil? Indicadores actualizados',
    description: '¿Hay una burbuja bursátil? Consulta CAPE de Shiller, valor de mercado/PIB, deuda de margen, asignación familiar, crédito y VIX a diario.',
    image: '/og-es.png', imageAlt: '¿Hay una burbuja bursátil? Panel diario de riesgo de mercado.',
    wordmark: '¿ESTAMOS EN UNA BURBUJA?', homeLabel: '¿Estamos en una burbuja? inicio',
    freshness: 'DATOS REVISADOS A DIARIO', shortAnswer: 'LA RESPUESTA CORTA',
    verdict: { YES: 'SÍ', PROBABLY: 'PROBABLEMENTE', MAYBE: 'QUIZÁ', NOT_YET: 'TODAVÍA NO', NO: 'NO' },
    summaries: {
      YES: 'La evidencia es amplia y está excepcionalmente tensionada. Esto parece territorio de burbuja, aunque ningún indicador puede anticipar el techo.',
      PROBABLY: 'Varias señales independientes están en alerta. El mercado parece más burbujeante que simplemente caro.',
      MAYBE: 'La evidencia es realmente mixta. Algunos indicadores están calientes y otros todavía no se han unido a la fiesta.',
      NOT_YET: 'Algunos ingredientes se están calentando, pero la receta completa de la burbuja aún no está en el horno.',
      NO: 'La valoración, el apalancamiento, el posicionamiento y el apetito por el riesgo no apuntan conjuntamente a una burbuja.'
    },
    scoreAria: 'Índice de presión de burbuja bursátil', scoreLabel: 'PRESIÓN COMPUESTA', cool: 'CALMA', stretched: 'TENSIÓN', bubble: 'BURBUJA',
    scoreCopy: 'La valoración y el apalancamiento representan el 70% de la puntuación.', readEvidence: 'VER LA EVIDENCIA',
    confidenceLabel: 'CONFIANZA EN LA DECISIÓN', confidenceHigh: 'ACUERDO ALTO', confidenceMedium: 'ACUERDO MIXTO', confidenceLow: 'ACUERDO BAJO',
    confidenceHelp: 'Mide el acuerdo entre señales y la distancia a un umbral, no la probabilidad de una caída.',
    confidenceCopy: { high: 'Los indicadores cuentan casi la misma historia.', medium: 'Los indicadores coinciden en la dirección, pero hay discrepancias relevantes.', low: 'Los indicadores discrepan. Conviene tomar el titular con más cautela.' },
    evidenceKicker: 'LA EVIDENCIA', evidenceTitle: ['Seis señales.', 'Una lectura honesta.'],
    evidenceIntro: 'Ninguna métrica puede anticipar por sí sola un techo de mercado. Combinamos valoración, apalancamiento y posicionamiento con señales más rápidas de crédito y sentimiento.',
    risk: 'RIESGO', low: 'BAJO', high: 'ALTO', trend: 'TENDENCIA HISTÓRICA', asOf: 'DATOS DE', sourceSuffix: 'FUENTE',
    methodKicker: 'CÓMO INTERPRETARLO', methodTitle: ['Un termómetro,', 'no una bola de cristal.'],
    methodP1: 'Este índice de burbuja bursátil mide cuánto se parece el mercado estadounidense actual a periodos históricamente sobrecalentados. No predice cuándo caerán los precios, ni afirma que tengan que hacerlo.',
    methodP2: 'Cada indicador se normaliza de 0 a 100 con umbrales transparentes. La ponderación prioriza los fundamentales: valoración 45%, apalancamiento 25%, posicionamiento 10%, crédito 12% y sentimiento 8%.',
    aboutKicker: 'QUÉ SIGNIFICA EL ÍNDICE', aboutTitle: '¿Hay una burbuja en la bolsa?',
    aboutVerdict: { YES: 'La evidencia dice que sí.', PROBABLY: 'La evidencia dice que probablemente.', MAYBE: 'La evidencia es mixta.', NOT_YET: 'La evidencia dice que todavía no.', NO: 'La evidencia dice que no.' },
    aboutP1: 'Una burbuja no es simplemente un mercado en máximos históricos. Aparece cuando los precios, el apalancamiento y la confianza se separan de los fundamentos económicos. El índice compuesto muestra cuánto coinciden hoy esas condiciones.',
    aboutP2: 'El CAPE de Shiller y el valor de mercado frente al PIB miden la valoración. La deuda de margen de FINRA mide el apalancamiento. La asignación familiar a bolsa captura el posicionamiento; los diferenciales y el VIX miden el apetito por el riesgo.',
    disclaimer: 'Creado con datos públicos. No es asesoramiento financiero.', methodology: 'METODOLOGÍA Y DATOS', explore: 'EXPLORA LAS SEÑALES',
    updatedLabel: 'Última actualización', datasetName: 'Indicadores de burbuja bursátil en Estados Unidos',
    datasetDescription: 'Colección diaria de indicadores de valoración, apalancamiento, posicionamiento, crédito y sentimiento del mercado bursátil estadounidense.'
  }
} as const;

export const indicatorCopy = {
  es: {
    cape: { name: 'CAPE de Shiller', eyebrow: 'VALORACIÓN · 25% DEL ÍNDICE', description: 'Precio dividido por diez años de beneficios ajustados por inflación. Suaviza el ciclo económico para mostrar cuánto se paga por una capacidad de beneficio duradera.', threshold: 'Señal de burbuja por encima de 30×', change: 'Última lectura mensual' },
    buffett: { name: 'Valor de mercado / PIB', eyebrow: 'VALORACIÓN · 20% DEL ÍNDICE', description: 'Valor de las acciones estadounidenses frente a la producción económica anual. Indica cuánto paga el mercado por cada dólar que produce la economía.', threshold: 'Señal de burbuja por encima del 180%', change: 'Última lectura trimestral' },
    margin: { name: 'Deuda de margen', eyebrow: 'APALANCAMIENTO · 25% DEL ÍNDICE', description: 'Dinero que los clientes piden prestado contra sus valores. Un crecimiento rápido implica más apalancamiento y más ventas forzadas si los precios retroceden.', threshold: 'Riesgo alto por encima del 25% anual', change: 'VARIACIÓN_INTERANUAL' },
    allocation: { name: 'Asignación familiar a bolsa', eyebrow: 'POSICIONAMIENTO · 10% DEL ÍNDICE', description: 'Porcentaje de los activos financieros de los hogares invertido directa o indirectamente en acciones. Una asignación históricamente alta indica cuánto patrimonio depende ya de que la bolsa siga subiendo.', threshold: 'Extremo por encima del 45%', change: 'Última lectura trimestral' },
    credit: { name: 'Diferencial de crédito', eyebrow: 'CRÉDITO · 12% DEL ÍNDICE', description: 'Rentabilidad adicional que pagan las empresas estadounidenses con calificación Baa frente al bono del Tesoro a diez años. Un diferencial muy estrecho indica que los prestamistas perciben poco riesgo.', threshold: 'Complacencia por debajo del 1,80%', change: 'Los prestamistas perciben poco riesgo' },
    vix: { name: 'Volatilidad del mercado', eyebrow: 'SENTIMIENTO · 8% DEL ÍNDICE', description: 'El VIX refleja la volatilidad esperada a corto plazo del S&P 500. Lecturas excepcionalmente bajas pueden revelar complacencia entre los inversores.', threshold: 'Complacencia por debajo de 14', change: 'Calma, pero sin euforia' }
  }
} as const;

export const statusCopy = {
  en: { Extreme: 'Extreme', Elevated: 'Elevated', Complacent: 'Complacent', Neutral: 'Neutral' },
  es: { Extreme: 'Extremo', Elevated: 'Elevado', Complacent: 'Complaciente', Neutral: 'Neutral' }
} as const;
