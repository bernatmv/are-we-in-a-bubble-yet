import type { Locale } from './i18n';
export type ArticleLocale = 'en' | 'es';

export const articles = [
  {
    id: 'spot-bubble',
    slug: { en: 'how-to-spot-a-stock-market-bubble', es: 'como-detectar-una-burbuja-bursatil' },
    en: {
      kicker: 'BUBBLE BASICS', title: 'How to spot a stock market bubble',
      description: 'Learn the clearest signs of a stock market bubble, from stretched valuations and leverage to investor positioning, credit and complacency.',
      intro: 'Bubbles rarely announce themselves with one perfect number. They emerge when expensive prices, easy financing and confident behavior begin reinforcing one another.',
      sections: [
        ['Start with valuation, not headlines', 'High prices alone do not prove a bubble. Compare prices with durable earning power and the size of the economy. Shiller CAPE and market value to GDP are slow-moving gauges that reveal when optimism has become historically expensive.'],
        ['Look for fuel', 'Leverage turns enthusiasm into fragility. Fast-rising margin debt means more investors are borrowing against securities, which can amplify gains on the way up and forced selling on the way down.'],
        ['Demand confirmation', 'Positioning, credit spreads and volatility show whether investors and lenders are behaving as if risk has disappeared. A convincing bubble signal is broad: several independent gauges should be hot at the same time.']
      ]
    },
    es: {
      kicker: 'CONCEPTOS BÁSICOS', title: 'Cómo detectar una burbuja bursátil',
      description: 'Aprende las señales más claras de una burbuja bursátil: valoración, apalancamiento, posicionamiento, crédito y complacencia.',
      intro: 'Las burbujas casi nunca se anuncian con un único número perfecto. Aparecen cuando los precios caros, la financiación fácil y la confianza se refuerzan mutuamente.',
      sections: [
        ['Empieza por la valoración, no por los titulares', 'Los precios altos por sí solos no demuestran una burbuja. Compáralos con los beneficios sostenibles y el tamaño de la economía. El CAPE de Shiller y el valor de mercado frente al PIB muestran cuándo el optimismo se ha vuelto históricamente caro.'],
        ['Busca el combustible', 'El apalancamiento convierte el entusiasmo en fragilidad. Un crecimiento rápido de la deuda de margen implica más dinero prestado contra valores, lo que amplifica las subidas y las ventas forzadas durante una caída.'],
        ['Exige confirmación', 'El posicionamiento, los diferenciales de crédito y la volatilidad indican si inversores y prestamistas actúan como si el riesgo hubiera desaparecido. Una señal convincente debe ser amplia: varios indicadores independientes tienen que calentarse a la vez.']
      ]
    }
  },
  {
    id: 'cape',
    slug: { en: 'what-is-the-shiller-cape-ratio', es: 'que-es-el-ratio-cape-de-shiller' },
    en: {
      kicker: 'VALUATION GUIDE', title: 'What is the Shiller CAPE ratio?',
      description: 'A plain-English guide to the Shiller CAPE ratio, what it measures, its historical bubble signals and the limits investors should understand.',
      intro: 'The Shiller CAPE asks a deliberately patient question: how much are investors paying for a decade of inflation-adjusted corporate earnings?',
      sections: [
        ['Why use ten years of earnings?', 'One year of profits can be distorted by a recession, a boom or an unusual shock. Averaging ten inflation-adjusted years smooths the cycle and makes comparisons across market eras more useful.'],
        ['What counts as expensive?', 'There is no magic cutoff, but readings above 30 have historically belonged to a rare and expensive part of the distribution. The dot-com peak was much higher; other costly markets corrected without matching it.'],
        ['What CAPE cannot tell you', 'CAPE is poor at timing. An expensive market can become more expensive and remain there for years. Use it as a pressure gauge, then look to leverage, positioning, credit and sentiment for confirmation.']
      ]
    },
    es: {
      kicker: 'GUÍA DE VALORACIÓN', title: '¿Qué es el ratio CAPE de Shiller?',
      description: 'Guía clara sobre el CAPE de Shiller: qué mide, sus señales históricas de burbuja y los límites que todo inversor debe conocer.',
      intro: 'El CAPE de Shiller plantea una pregunta deliberadamente paciente: ¿cuánto pagan los inversores por una década de beneficios empresariales ajustados por inflación?',
      sections: [
        ['¿Por qué usar diez años de beneficios?', 'Un solo año puede estar distorsionado por una recesión, un auge o un choque excepcional. La media de diez años ajustados por inflación suaviza el ciclo y permite comparar épocas distintas.'],
        ['¿Qué se considera caro?', 'No existe un umbral mágico, pero las lecturas superiores a 30 han ocupado históricamente una zona rara y cara. El máximo puntocom fue mucho mayor; otros mercados costosos corrigieron sin alcanzarlo.'],
        ['Lo que el CAPE no puede decir', 'El CAPE no sirve para anticipar fechas. Un mercado caro puede encarecerse y seguir así durante años. Úsalo como indicador de presión y busca confirmación en el apalancamiento, el posicionamiento, el crédito y el sentimiento.']
      ]
    }
  },
  {
    id: 'margin-debt',
    slug: { en: 'margin-debt-and-stock-market-bubbles', es: 'deuda-de-margen-y-burbujas-bursatiles' },
    en: {
      kicker: 'LEVERAGE GUIDE', title: 'Margin debt and stock market bubbles',
      description: 'Understand how FINRA margin debt can amplify stock market bubbles, why its rate of change matters and what the indicator cannot predict.',
      intro: 'Margin debt is money investors borrow against securities in their brokerage accounts. It is both a measure of confidence and a source of forced selling.',
      sections: [
        ['Why acceleration matters', 'The dollar level naturally grows with the market and the economy, so the pace of change is often more informative. Rapid year-over-year growth suggests that risk-taking is accelerating rather than merely keeping up.'],
        ['The feedback loop', 'Borrowing can lift demand and prices, which increases collateral values and enables more borrowing. When prices fall, the loop can reverse through margin calls and compulsory sales.'],
        ['Read it beside valuation', 'Margin debt is not a standalone sell signal. Rising leverage is most concerning when valuations are already stretched and lenders and investors remain unusually relaxed about risk.']
      ]
    },
    es: {
      kicker: 'GUÍA DE APALANCAMIENTO', title: 'Deuda de margen y burbujas bursátiles',
      description: 'Entiende cómo la deuda de margen de FINRA puede amplificar una burbuja, por qué importa su crecimiento y qué no puede predecir.',
      intro: 'La deuda de margen es el dinero que los inversores piden prestado contra los valores de sus cuentas. Mide confianza y también puede provocar ventas forzadas.',
      sections: [
        ['Por qué importa la aceleración', 'El nivel en dólares crece de forma natural con el mercado y la economía, por lo que el ritmo de cambio suele ser más informativo. Un aumento interanual rápido indica que la toma de riesgo se acelera.'],
        ['El círculo de retroalimentación', 'El crédito puede elevar la demanda y los precios, aumentando el valor del colateral y permitiendo pedir aún más prestado. Cuando los precios caen, el círculo se invierte mediante llamadas de margen y ventas obligatorias.'],
        ['Léela junto a la valoración', 'La deuda de margen no es una señal de venta independiente. El apalancamiento preocupa más cuando la valoración ya está tensionada y prestamistas e inversores siguen demasiado tranquilos ante el riesgo.']
      ]
    }
  },
  {
    id: 'methodology',
    slug: { en: 'how-our-bubble-indicator-works', es: 'como-funciona-el-indicador-de-burbuja' },
    en: {
      kicker: 'METHODOLOGY', title: 'How our bubble indicator works',
      description: 'See how our stock market bubble indicator combines six signals, why valuation and leverage come first, and what each weight contributes.',
      intro: 'The indicator is a structured argument, not a forecast. It asks whether expensive prices, leverage and confident risk-taking are appearing together—and makes every judgment visible.',
      sections: [
        ['From six readings to one score', 'Each signal is clamped to a 0–100 pressure score using a fixed range: CAPE 18–42, market value to GDP 80–240%, margin-debt growth −10–40%, household equity allocation 25–50%, credit spreads 4.5–1.5% and VIX 30–10. The last two run in reverse because lower readings imply more complacency. We multiply those scores by their weights and add them. The composite becomes NO below 30, NOT YET at 30, MAYBE at 45, PROBABLY at 60 and YES at 75.'],
        ['First priority: valuation · 45%', 'Valuation gets the largest share because detachment from economic fundamentals is the defining ingredient of a bubble. Shiller CAPE receives 25% and market value to GDP 20%. CAPE compares prices with smoothed earning power; market value to GDP compares the whole market with the economy supporting it. Using both keeps one valuation lens from deciding the verdict alone.'],
        ['Second priority: leverage · 25%', 'Margin debt receives 25%, equal to the largest single valuation signal. Borrowing does more than accompany optimism: it can amplify demand on the way up and force selling when collateral falls. We score its year-over-year growth rather than its dollar level, because the level naturally rises as markets and the economy grow.'],
        ['Confirmation signals · 30%', 'The remaining signals test whether the enthusiasm is broad. Credit spreads receive 12% because lenders provide an independent market price for risk. Household equity allocation receives 10% because crowded ownership leaves less uncommitted buying power. The VIX receives 8%, the smallest weight, because short-term calm can be useful confirmation but is noisy and can reverse quickly.'],
        ['Why the weights are not probabilities', 'The weights express priority, not the chance of a crash: 25% does not mean a signal predicts one quarter of market outcomes. Slow-moving fundamentals and leverage carry 70% so a fleeting mood cannot dominate the result. A separate confidence measure checks how closely the six signals agree and how far the composite sits from the next decision boundary. Read the score as a transparent temperature check, never as a market-timing rule.']
      ]
    },
    es: {
      kicker: 'METODOLOGÍA', title: 'Cómo funciona el indicador de burbuja',
      description: 'Descubre cómo nuestro indicador de burbuja bursátil combina seis señales, por qué prioriza valoración y apalancamiento y qué aporta cada peso.',
      intro: 'El indicador es un argumento estructurado, no una predicción. Pregunta si los precios caros, el apalancamiento y la confianza ante el riesgo aparecen a la vez, y deja cada decisión a la vista.',
      sections: [
        ['De seis lecturas a una puntuación', 'Cada señal se limita a una puntuación de presión de 0 a 100 con un rango fijo: CAPE 18–42, valor de mercado/PIB 80–240%, crecimiento de la deuda de margen −10–40%, asignación familiar a bolsa 25–50%, diferenciales de crédito 4,5–1,5% y VIX 30–10. Los dos últimos se invierten porque una lectura menor implica más complacencia. Multiplicamos las puntuaciones por sus pesos y las sumamos. El índice dice NO por debajo de 30, TODAVÍA NO desde 30, QUIZÁ desde 45, PROBABLEMENTE desde 60 y SÍ desde 75.'],
        ['Primera prioridad: valoración · 45%', 'La valoración recibe el mayor peso porque la separación respecto a los fundamentos económicos es el ingrediente esencial de una burbuja. El CAPE de Shiller aporta un 25% y el valor de mercado frente al PIB un 20%. El CAPE compara precios con beneficios suavizados; el segundo compara todo el mercado con la economía que lo sostiene. Usar ambos evita que una sola perspectiva decida el resultado.'],
        ['Segunda prioridad: apalancamiento · 25%', 'La deuda de margen aporta un 25%, igual que la mayor señal de valoración. El crédito no solo acompaña al optimismo: puede amplificar la demanda durante la subida y forzar ventas cuando cae el valor del colateral. Medimos su crecimiento interanual, no el nivel en dólares, porque ese nivel aumenta de forma natural con el mercado y la economía.'],
        ['Señales de confirmación · 30%', 'Las señales restantes comprueban si el entusiasmo es amplio. Los diferenciales de crédito pesan un 12% porque los prestamistas aportan un precio del riesgo independiente. La asignación familiar a bolsa pesa un 10% porque un posicionamiento saturado deja menos compradores disponibles. El VIX pesa un 8%, el mínimo, porque la calma a corto plazo confirma el contexto, pero es ruidosa y puede cambiar rápido.'],
        ['Los pesos no son probabilidades', 'Los pesos expresan prioridad, no la probabilidad de una caída: un 25% no significa que una señal explique la cuarta parte de los resultados del mercado. Los fundamentales lentos y el apalancamiento suman un 70% para que un cambio fugaz de ánimo no domine el índice. Una medida de confianza separada evalúa cuánto coinciden las seis señales y a qué distancia está el resultado del siguiente umbral. Léelo como un termómetro transparente, nunca como una regla para anticipar el mercado.']
      ]
    }
  }
] as const;

export function articlePath(article: typeof articles[number], locale: Locale) {
  return locale === 'es' ? `/es/aprender/${article.slug.es}/` : `/learn/${article.slug.en}/`;
}

export function articleAlternatePath(article: typeof articles[number], locale: ArticleLocale) {
  return articlePath(article, locale === 'en' ? 'es' : 'en');
}
