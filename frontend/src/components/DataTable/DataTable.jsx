import { useState, useMemo } from 'react';
import './DataTable.css';

const DataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  searchable = true,
  searchPlaceholder = 'Pesquisar...',
  itemsPerPageOptions = [5, 10, 20, 50],
  defaultItemsPerPage = 10,
  actions = true,
  customActions,
  loading = false,
  emptyMessage = 'Nenhum registo encontrado.',
}) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;

    return data.filter((item) =>
      columns.some((col) => {
        const value = col.accessor ? getNestedValue(item, col.accessor) : '';
        return String(value).toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [data, search, columns]);

  // Ordenação
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = getNestedValue(a, sortConfig.key);
      const bVal = getNestedValue(b, sortConfig.key);

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const comparison = String(aVal).localeCompare(String(bVal), 'pt', { numeric: true });
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortConfig]);

  // Paginação
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="data-table-container">
      {/* Toolbar */}
      <div className="data-table-toolbar">
        {searchable && (
          <div className="data-table-search">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={handleSearchChange}
              className="search-input"
            />
            {search && (
              <button className="search-clear" onClick={() => { setSearch(''); setCurrentPage(1); }}>
                ✕
              </button>
            )}
          </div>
        )}

        <div className="data-table-info">
          <span className="results-count">
            {filteredData.length} {filteredData.length === 1 ? 'registo' : 'registos'}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="data-table-wrapper">
        {loading ? (
          <div className="data-table-loading">
            <div className="loading-spinner"></div>
            <span>A carregar dados...</span>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.accessor || col.header}
                    onClick={() => col.sortable !== false && col.accessor && handleSort(col.accessor)}
                    className={`${col.sortable !== false && col.accessor ? 'sortable' : ''} ${col.className || ''}`}
                    style={col.width ? { width: col.width } : {}}
                  >
                    <div className="th-content">
                      <span>{col.header}</span>
                      {col.sortable !== false && col.accessor && (
                        <span className={`sort-icon ${sortConfig.key === col.accessor ? 'active' : ''}`}>
                          {sortConfig.key === col.accessor
                            ? sortConfig.direction === 'asc' ? '↑' : '↓'
                            : '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {actions && <th className="actions-column">Ações</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (actions ? 1 : 0)} className="empty-row">
                    <div className="empty-state">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="empty-icon">
                        <path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0h-2.586a1 1 0 0 0-.707.293l-2.414 2.414a1 1 0 0 1-.707.293h-3.172a1 1 0 0 1-.707-.293l-2.414-2.414A1 1 0 0 0 6.586 13H4" />
                      </svg>
                      <span>{emptyMessage}</span>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr key={item.id || index}>
                    {columns.map((col) => (
                      <td key={col.accessor || col.header} className={col.className || ''}>
                        {col.render
                          ? col.render(item)
                          : getNestedValue(item, col.accessor)}
                      </td>
                    ))}
                    {actions && (
                      <td className="actions-cell">
                        <div className="action-buttons">
                          {customActions
                            ? customActions(item)
                            : (
                              <>
                                {onView && (
                                  <button
                                    className="action-btn view-btn"
                                    onClick={() => onView(item)}
                                    title="Ver detalhes"
                                  >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                      <circle cx="12" cy="12" r="3" />
                                    </svg>
                                  </button>
                                )}
                                {onEdit && (
                                  <button
                                    className="action-btn edit-btn"
                                    onClick={() => onEdit(item)}
                                    title="Editar"
                                  >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                  </button>
                                )}
                                {onDelete && (
                                  <button
                                    className="action-btn delete-btn"
                                    onClick={() => onDelete(item)}
                                    title="Eliminar"
                                  >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <polyline points="3,6 5,6 21,6" />
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                      <line x1="10" y1="11" x2="10" y2="17" />
                                      <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                  </button>
                                )}
                              </>
                            )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="data-table-pagination">
          <div className="pagination-items-per-page">
            <label>Mostrar:</label>
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              {itemsPerPageOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              title="Primeira página"
            >
              ««
            </button>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              title="Página anterior"
            >
              «
            </button>

            <div className="pagination-pages">
              {generatePageNumbers(currentPage, totalPages).map((page, i) =>
                page === '...' ? (
                  <span key={`dots-${i}`} className="pagination-dots">...</span>
                ) : (
                  <button
                    key={page}
                    className={`pagination-btn page-num ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              title="Próxima página"
            >
              »
            </button>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              title="Última página"
            >
              »»
            </button>
          </div>

          <span className="pagination-info">
            Página {currentPage} de {totalPages}
          </span>
        </div>
      )}
    </div>
  );
};

// Helpers
function getNestedValue(obj, path) {
  if (!path) return '';
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

function generatePageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 3) return [1, 2, 3, 4, '...', total];
  if (current >= total - 2) return [1, '...', total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

export default DataTable;