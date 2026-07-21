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
  }
] as const;

export function articlePath(article: typeof articles[number], locale: Locale) {
  return locale === 'es' ? `/es/aprender/${article.slug.es}/` : `/learn/${article.slug.en}/`;
}

export function articleAlternatePath(article: typeof articles[number], locale: ArticleLocale) {
  return articlePath(article, locale === 'en' ? 'es' : 'en');
}
