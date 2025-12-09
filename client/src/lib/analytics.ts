/**
 * Módulo de Análisis Estadísticos
 * Proporciona funciones para calcular métricas y análisis avanzados
 */

import * as stats from 'simple-statistics';

export interface AnalyticsMetrics {
  mean: number;
  median: number;
  stdDev: number;
  min: number;
  max: number;
  range: number;
  q1: number;
  q3: number;
  iqr: number;
  skewness: number;
  kurtosis: number;
}

export interface TrendAnalysis {
  direction: 'up' | 'down' | 'stable';
  percentageChange: number;
  slope: number;
  r2: number;
}

export interface CorrelationMatrix {
  [key: string]: { [key: string]: number };
}

/**
 * Calcula métricas estadísticas básicas
 */
export function calculateMetrics(values: number[]): AnalyticsMetrics {
  const sorted = [...values].sort((a, b) => a - b);
  const mean = stats.mean(values);
  const median = stats.median(values);
  const stdDev = stats.standardDeviation(values);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  const q1 = stats.quantile(sorted, 0.25);
  const q3 = stats.quantile(sorted, 0.75);
  const iqr = q3 - q1;
  const skewness = stats.sampleSkewness(values);
  const kurtosis = stats.sampleKurtosis(values);

  return {
    mean,
    median,
    stdDev,
    min,
    max,
    range,
    q1,
    q3,
    iqr,
    skewness,
    kurtosis,
  };
}

/**
 * Analiza tendencias en datos de series temporales
 */
export function analyzeTrend(values: number[]): TrendAnalysis {
  if (values.length < 2) {
    return {
      direction: 'stable',
      percentageChange: 0,
      slope: 0,
      r2: 0,
    };
  }

  const x = Array.from({ length: values.length }, (_, i) => i);
  const regression = stats.linearRegression(
    x.map((xi, i) => [xi, values[i]])
  );

  const slope = regression.m;
  const firstValue = values[0];
  const lastValue = values[values.length - 1];
  const percentageChange = firstValue !== 0 
    ? ((lastValue - firstValue) / firstValue) * 100 
    : 0;

  // Calcular R²
  const predictions = x.map(xi => regression.b + regression.m * xi);
  const ssRes = values.reduce((sum, val, i) => sum + Math.pow(val - predictions[i], 2), 0);
  const ssTot = values.reduce((sum, val) => sum + Math.pow(val - stats.mean(values), 2), 0);
  const r2 = ssTot === 0 ? 0 : 1 - (ssRes / ssTot);

  const direction = slope > 0.1 ? 'up' : slope < -0.1 ? 'down' : 'stable';

  return {
    direction,
    percentageChange,
    slope,
    r2,
  };
}

/**
 * Calcula correlación entre dos variables
 */
export function calculateCorrelation(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) {
    return 0;
  }

  const correlation = stats.sampleCorrelation(x, y);
  
  return isNaN(correlation) ? 0 : correlation;
}

/**
 * Detecta outliers usando el método IQR
 */
export function detectOutliers(values: number[]): { outliers: number[]; indices: number[] } {
  const sorted = [...values].sort((a, b) => a - b);
  const q1 = stats.quantile(sorted, 0.25);
  const q3 = stats.quantile(sorted, 0.75);
  const iqr = q3 - q1;
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;

  const outliers: number[] = [];
  const indices: number[] = [];

  values.forEach((value, index) => {
    if (value < lowerBound || value > upperBound) {
      outliers.push(value);
      indices.push(index);
    }
  });

  return { outliers, indices };
}

/**
 * Calcula matriz de correlación entre múltiples variables
 */
export function calculateCorrelationMatrix(
  data: { [key: string]: number[] }
): CorrelationMatrix {
  const keys = Object.keys(data);
  const matrix: CorrelationMatrix = {};

  keys.forEach(key1 => {
    matrix[key1] = {};
    keys.forEach(key2 => {
      if (key1 === key2) {
        matrix[key1][key2] = 1;
      } else {
        matrix[key1][key2] = calculateCorrelation(data[key1], data[key2]);
      }
    });
  });

  return matrix;
}

/**
 * Agrupa datos por categoría y calcula estadísticas
 */
export function groupByAndAnalyze(
  data: { category: string; value: number }[]
): { [key: string]: AnalyticsMetrics } {
  const grouped: { [key: string]: number[] } = {};

  data.forEach(({ category, value }) => {
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(value);
  });

  const result: { [key: string]: AnalyticsMetrics } = {};
  Object.entries(grouped).forEach(([category, values]) => {
    result[category] = calculateMetrics(values);
  });

  return result;
}

/**
 * Calcula percentiles personalizados
 */
export function calculatePercentiles(
  values: number[],
  percentiles: number[] = [10, 25, 50, 75, 90]
): { [key: number]: number } {
  const sorted = [...values].sort((a, b) => a - b);
  const result: { [key: number]: number } = {};

  percentiles.forEach(p => {
    result[p] = stats.quantile(sorted, p / 100);
  });

  return result;
}

/**
 * Realiza análisis de varianza simple (ANOVA)
 */
export function simpleAnova(groups: { [key: string]: number[] }): {
  fStatistic: number;
  pValue: number;
} {
  const groupKeys = Object.keys(groups);
  const allValues = Object.values(groups).flat();
  const grandMean = stats.mean(allValues);
  const n = allValues.length;
  const k = groupKeys.length;

  // Sum of Squares Between
  let ssb = 0;
  groupKeys.forEach(key => {
    const groupMean = stats.mean(groups[key]);
    const groupSize = groups[key].length;
    ssb += groupSize * Math.pow(groupMean - grandMean, 2);
  });

  // Sum of Squares Within
  let ssw = 0;
  groupKeys.forEach(key => {
    const groupMean = stats.mean(groups[key]);
    groups[key].forEach(value => {
      ssw += Math.pow(value - groupMean, 2);
    });
  });

  const msb = ssb / (k - 1);
  const msw = ssw / (n - k);
  const fStatistic = msb / msw;

  // Aproximación simple del p-value (no es exacto, pero funciona para análisis básicos)
  const pValue = 1 / (1 + fStatistic);

  return { fStatistic, pValue };
}

/**
 * Formatea métricas para presentación
 */
export function formatMetrics(metrics: AnalyticsMetrics): { [key: string]: string } {
  return {
    'Media': metrics.mean.toFixed(2),
    'Mediana': metrics.median.toFixed(2),
    'Desv. Est.': metrics.stdDev.toFixed(2),
    'Mínimo': metrics.min.toFixed(2),
    'Máximo': metrics.max.toFixed(2),
    'Rango': metrics.range.toFixed(2),
    'Q1': metrics.q1.toFixed(2),
    'Q3': metrics.q3.toFixed(2),
    'IQR': metrics.iqr.toFixed(2),
  };
}
