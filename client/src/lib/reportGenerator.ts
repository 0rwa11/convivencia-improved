/**
 * Módulo de Generación de Reportes
 * Proporciona funciones para generar reportes PDF y Excel
 */

import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { AnalyticsMetrics } from './analytics';

export interface ReportData {
  title: string;
  date: string;
  summary: string;
  metrics: { [key: string]: AnalyticsMetrics };
  tables: Array<{
    name: string;
    headers: string[];
    rows: (string | number)[][];
  }>;
  charts?: Array<{
    title: string;
    data: any;
  }>;
}

/**
 * Genera un reporte PDF
 */
export async function generatePDF(
  data: ReportData,
  filename: string = 'reporte.pdf'
): Promise<void> {
  const doc = new jsPDF();
  let yPosition = 20;
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const lineHeight = 7;

  // Título
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(data.title, margin, yPosition);
  yPosition += 15;

  // Fecha
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generado: ${data.date}`, margin, yPosition);
  yPosition += 10;

  // Resumen
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Resumen', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const summaryLines = doc.splitTextToSize(data.summary, pageWidth - 2 * margin);
  doc.text(summaryLines, margin, yPosition);
  yPosition += summaryLines.length * lineHeight + 10;

  // Métricas
  if (Object.keys(data.metrics).length > 0) {
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Métricas Estadísticas', margin, yPosition);
    yPosition += 10;

    Object.entries(data.metrics).forEach(([metricName, metrics]) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(metricName, margin, yPosition);
      yPosition += 8;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const metricLines = [
        `Media: ${metrics.mean.toFixed(2)}`,
        `Mediana: ${metrics.median.toFixed(2)}`,
        `Desv. Est.: ${metrics.stdDev.toFixed(2)}`,
        `Mín: ${metrics.min.toFixed(2)} | Máx: ${metrics.max.toFixed(2)}`,
      ];

      metricLines.forEach(line => {
        doc.text(line, margin + 5, yPosition);
        yPosition += lineHeight;
      });

      yPosition += 5;
    });
  }

  // Tablas
  data.tables.forEach(table => {
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(table.name, margin, yPosition);
    yPosition += 10;

    // Crear tabla
    const tableData = [
      table.headers,
      ...table.rows,
    ];

    const cellWidth = (pageWidth - 2 * margin) / table.headers.length;
    const cellHeight = 7;

    // Headers
    doc.setFillColor(41, 128, 185);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);

    table.headers.forEach((header, i) => {
      doc.rect(
        margin + i * cellWidth,
        yPosition,
        cellWidth,
        cellHeight,
        'F'
      );
      doc.text(
        header,
        margin + i * cellWidth + 2,
        yPosition + 5,
        { maxWidth: cellWidth - 4 }
      );
    });

    yPosition += cellHeight;

    // Rows
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);

    table.rows.forEach((row, rowIndex) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }

      const rowHeight = cellHeight;
      if (rowIndex % 2 === 0) {
        doc.setFillColor(240, 240, 240);
        doc.rect(
          margin,
          yPosition,
          pageWidth - 2 * margin,
          rowHeight,
          'F'
        );
      }

      row.forEach((cell, i) => {
        doc.text(
          String(cell),
          margin + i * cellWidth + 2,
          yPosition + 5,
          { maxWidth: cellWidth - 4 }
        );
      });

      yPosition += rowHeight;
    });

    yPosition += 10;
  });

  // Descargar
  doc.save(filename);
}

/**
 * Genera un reporte Excel
 */
export function generateExcel(
  data: ReportData,
  filename: string = 'reporte.xlsx'
): void {
  const workbook = XLSX.utils.book_new();

  // Hoja de resumen
  const summarySheet = XLSX.utils.aoa_to_sheet([
    ['Reporte de Análisis'],
    ['Título', data.title],
    ['Fecha', data.date],
    ['Resumen', data.summary],
  ]);

  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumen');

  // Hojas de métricas
  Object.entries(data.metrics).forEach(([metricName, metrics]) => {
    const metricSheet = XLSX.utils.aoa_to_sheet([
      ['Métrica', 'Valor'],
      ['Media', metrics.mean],
      ['Mediana', metrics.median],
      ['Desv. Est.', metrics.stdDev],
      ['Mínimo', metrics.min],
      ['Máximo', metrics.max],
      ['Rango', metrics.range],
      ['Q1', metrics.q1],
      ['Q3', metrics.q3],
      ['IQR', metrics.iqr],
      ['Skewness', metrics.skewness],
      ['Kurtosis', metrics.kurtosis],
    ]);

    XLSX.utils.book_append_sheet(workbook, metricSheet, metricName.slice(0, 31));
  });

  // Hojas de tablas
  data.tables.forEach((table, index) => {
    const tableSheet = XLSX.utils.aoa_to_sheet([
      table.headers,
      ...table.rows,
    ]);

    const sheetName = table.name.slice(0, 31);
    XLSX.utils.book_append_sheet(workbook, tableSheet, sheetName);
  });

  // Descargar
  XLSX.writeFile(workbook, filename);
}

/**
 * Genera CSV desde datos tabulares
 */
export function generateCSV(
  data: {
    headers: string[];
    rows: (string | number)[][];
  },
  filename: string = 'datos.csv'
): void {
  const csvContent = [
    data.headers.join(','),
    ...data.rows.map(row => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exporta tabla HTML a Excel
 */
export function exportTableToExcel(
  tableElement: HTMLTableElement,
  filename: string = 'tabla.xlsx'
): void {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.table_to_sheet(tableElement);

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
  XLSX.writeFile(workbook, filename);
}

/**
 * Crea un reporte de comparativa
 */
export function createComparisonReport(
  title: string,
  items: Array<{
    name: string;
    metrics: AnalyticsMetrics;
  }>
): ReportData {
  const headers = [
    'Elemento',
    'Media',
    'Mediana',
    'Desv. Est.',
    'Mín',
    'Máx',
  ];

  const rows = items.map(item => [
    item.name,
    item.metrics.mean.toFixed(2),
    item.metrics.median.toFixed(2),
    item.metrics.stdDev.toFixed(2),
    item.metrics.min.toFixed(2),
    item.metrics.max.toFixed(2),
  ]);

  return {
    title,
    date: new Date().toLocaleDateString('es-ES'),
    summary: `Comparativa de ${items.length} elementos con análisis estadístico detallado.`,
    metrics: {},
    tables: [
      {
        name: 'Comparativa de Métricas',
        headers,
        rows,
      },
    ],
  };
}
