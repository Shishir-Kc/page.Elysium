import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

/**
 * Parses a markdown table string into structured data.
 */
function parseMarkdownTable(tableString) {
  const lines = tableString
    .trim()
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 3) return null;

  const parseLine = (line) =>
    line
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim());

  const headers = parseLine(lines[0]);

  const sepCells = parseLine(lines[1]);
  const isSeparator = sepCells.every((cell) => /^:?-+:?$/.test(cell));
  if (!isSeparator) return null;

  const alignments = sepCells.map((cell) => {
    const left = cell.startsWith(':');
    const right = cell.endsWith(':');
    if (left && right) return 'center';
    if (right) return 'right';
    return 'left';
  });

  const rows = lines.slice(2).map((line) => parseLine(line));

  return { headers, rows, alignments };
}

/**
 * Splits content into segments of plain text and markdown tables.
 */
function splitContentIntoSegments(text) {
  const lines = text.split('\n');
  const segments = [];
  let currentText = [];
  let currentTable = [];
  let inTable = false;

  const flushText = () => {
    if (currentText.length > 0) {
      segments.push({ type: 'text', content: currentText.join('\n') });
      currentText = [];
    }
  };

  const flushTable = () => {
    if (currentTable.length > 0) {
      segments.push({ type: 'table', content: currentTable.join('\n') });
      currentTable = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const isTableLine = line.startsWith('|') && line.endsWith('|');

    if (isTableLine) {
      if (!inTable) {
        flushText();
        inTable = true;
      }
      currentTable.push(lines[i]);
    } else {
      if (inTable) {
        flushTable();
        inTable = false;
      }
      currentText.push(lines[i]);
    }
  }

  if (inTable) flushTable();
  else flushText();

  return segments;
}

/** Renders inline markdown formatting: **bold** and `code` */
function renderInlineFormatting(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    const boldMatch = part.match(/^\*\*(.+)\*\*$/);
    if (boldMatch) {
      return (
        <span key={i} className="font-semibold text-white">
          {boldMatch[1]}
        </span>
      );
    }
    const codeMatch = part.match(/^`(.+)`$/);
    if (codeMatch) {
      return (
        <code
          key={i}
          style={{
            padding: '2px 7px',
            borderRadius: '5px',
            backgroundColor: 'rgba(255,255,255,0.08)',
            color: '#c8d0da',
            fontSize: '13px',
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          }}
        >
          {codeMatch[1]}
        </code>
      );
    }
    return part;
  });
}

function RenderedTable({ tableData }) {
  const { headers, rows, alignments } = tableData;

  return (
    <div
      style={{
        margin: '16px 0',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
      }}
    >
      <Table>
        <TableHeader>
          <TableRow
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
            }}
            className="hover:bg-transparent"
          >
            {headers.map((header, i) => (
              <TableHead
                key={i}
                style={{
                  textAlign: alignments[i] || 'left',
                  color: '#8b8f96',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  padding: '12px 16px',
                  borderRight: i < headers.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}
              >
                {renderInlineFormatting(header)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIdx) => (
            <TableRow
              key={rowIdx}
              style={{
                borderBottom: rowIdx < rows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                transition: 'background 0.15s ease',
              }}
              className="hover:!bg-white/[0.04]"
            >
              {row.map((cell, cellIdx) => (
                <TableCell
                  key={cellIdx}
                  style={{
                    textAlign: alignments[cellIdx] || 'left',
                    color: cellIdx === 0 ? '#e0e0e0' : '#b0b4ba',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    padding: '10px 16px',
                    fontWeight: cellIdx === 0 ? 500 : 400,
                    borderRight: cellIdx < row.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                >
                  {renderInlineFormatting(cell)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * MarkdownContent — renders AI response text, converting
 * markdown tables into styled shadcn <Table> components.
 */
export default function MarkdownContent({ content }) {
  const segments = splitContentIntoSegments(content);

  return (
    <>
      {segments.map((segment, idx) => {
        if (segment.type === 'table') {
          const tableData = parseMarkdownTable(segment.content);
          if (tableData) {
            return <RenderedTable key={idx} tableData={tableData} />;
          }
          return (
            <span key={idx} className="whitespace-pre-wrap">
              {segment.content}
            </span>
          );
        }
        return (
          <span key={idx} className="whitespace-pre-wrap">
            {segment.content}
          </span>
        );
      })}
    </>
  );
}
