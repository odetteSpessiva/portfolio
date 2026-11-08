import { useCallback, useEffect, useState } from "react";
import "./App.css";

const BASE_URL = "https://thptchuyen.hatinh.edu.vn";
const DISCOVERY_URL = `${BASE_URL}/hoc-tap/thoi-khoa-bieu`;
const TKB_JSON_URL =
  "https://raw.githubusercontent.com/odetteSpessiva/portfolio/main/tkb/data/tkb.json";

async function fetchTimetable() {
  const response = await fetch(`${TKB_JSON_URL}?t=${Date.now()}`);
  if (!response.ok) {
    throw new Error("Không thể tải dữ liệu thời khóa biểu mới nhất.");
  }
  const document = await response.json();
  if (
    !document ||
    !Array.isArray(document.rows) ||
    !document.rows.every((row) => Array.isArray(row))
  ) {
    throw new Error("Dữ liệu thời khóa biểu không đúng định dạng.");
  }

  const rows = document.rows;
  rows[0][0] = "Tiết";

  return {
    rows,
    title: document.title || "Thời khóa biểu",
    className: document.className || "",
    date: document.date || "",
    source: document.source || TKB_JSON_URL,
  };
}

function Loading() {
  return (
    <main className="state state--loading" aria-live="polite">
      <span className="loader" aria-hidden="true" />
      <p>Đang lấy thời khóa biểu mới nhất...</p>
      <small>Đang kết nối với cổng thông tin của trường</small>
    </main>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <main className="state state--error" aria-live="assertive">
      <span className="state__code">01 / unavailable</span>
      <div className="state__title">Chưa lấy được dữ liệu</div>
      <p>{message}</p>
      <button type="button" onClick={onRetry}>
        Thử lại
      </button>
      <a
        className="source-link"
        href={DISCOVERY_URL}
        target="_blank"
        rel="noreferrer"
      >
        Mở website nhà trường ↗
      </a>
    </main>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setData(await fetchTimetable());
    } catch (requestError) {
      setError(requestError.message || "Lỗi không xác định khi lấy dữ liệu.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="page">
      <header className="topbar">
        <a className="brand" href="../">
          [<span>tkb</span>]
        </a>
        <span className="topbar__meta">
          {data?.className} THPT CHUYÊN HÀ TĨNH
        </span>
      </header>
      {loading && <Loading />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && data && (
        <main className="content">
          <div className="heading">
            <div>
              <p className="eyebrow">LỊCH HỌC / CẬP NHẬT TRỰC TIẾP</p>
              <div className="page-title">
                Thời khóa biểu<span>.</span>
              </div>
              <p className="subtitle">
                {data.className} · {data.date}
              </p>
            </div>
          </div>
          <section
            className="table-shell"
            aria-label={`Thời khóa biểu ${data.className}`}
          >
            <div className="table-scroll">
              <table>
                <tbody>
                  {data.rows.map((row, rowIndex) => (
                    <tr key={`${rowIndex}-${row.join("-")}`}>
                      {row.map((cell, cellIndex) => (
                        <td
                          className={
                            rowIndex === 0 || cellIndex === 0
                              ? "is-heading"
                              : ""
                          }
                          key={`${cellIndex}-${cell}`}
                        >
                          {cell || <span className="empty">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <footer className="table-footer">
              <span>{data.title}</span>
              <a href={data.source} target="_blank" rel="noreferrer">
                Nguồn dữ liệu ↗
              </a>
            </footer>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
