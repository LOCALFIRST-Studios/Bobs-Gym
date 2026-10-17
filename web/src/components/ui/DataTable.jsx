/** Simple responsive table. First column is treated as the row header. */
export default function DataTable({ caption, columns, rows, captionHidden = false, className = '' }) {
  return (
    <div className={`table-wrap ${className}`}>
      <table className="data-table">
        {caption && <caption className={captionHidden ? 'sr-only' : undefined}>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => <th key={c} scope="col">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
