import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import "./App.css";

const BASE_URL = "https://thptchuyen.hatinh.edu.vn";
const DISCOVERY_URL = `${BASE_URL}/hoc-tap/thoi-khoa-bieu`;
const TKB_JSON_URL =
  "https://raw.githubusercontent.com/odetteSpessiva/portfolio/main/tkb/data/tkb.json";
const THEME_STORAGE_KEY = "tkb-theme";
const SCHOOL_DAY_END_HOUR = 12;

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getHighlightedDay() {
  const now = new Date();
  const weekday = now.getDay();
  if (
    weekday === 0 ||
    (weekday === 6 && now.getHours() >= SCHOOL_DAY_END_HOUR)
  ) {
    return 1;
  }
  if (now.getHours() < SCHOOL_DAY_END_HOUR) {
    return weekday;
  }
  return weekday + 1;
}

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
  const [theme, setTheme] = useState(getInitialTheme);
  const [highlightedDay, setHighlightedDay] = useState(getHighlightedDay);

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

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHighlightedDay(getHighlightedDay());
    }, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      return nextTheme;
    });
  }

  return (
    <div className="page" data-theme={theme}>
      <header className="topbar">
        <a className="brand" href="../">
          [<span>tkb</span>]
        </a>
        <span className="topbar__meta">
          {data?.className} THPT CHUYÊN HÀ TĨNH
        </span>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Chuyển sang giao diện ${
            theme === "dark" ? "sáng" : "tối"
          }`}
        >
          <span className="theme-toggle__icon" aria-hidden="true">
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </span>
        </button>
      </header>
      {loading && <Loading />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && data && (
        <main className="content">
          <div className="heading">
            <div>
              <p className="eyebrow">THỜI KHÓA BIỂU / THPT CHUYÊN HÀ TĨNH</p>
              <div className="page-title">
                {data.className || "Thời khóa biểu"}
                {data.date && <span> · {data.date}</span>}
              </div>
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
                          className={[
                            rowIndex === 0 || cellIndex === 0
                              ? "is-heading"
                              : "",
                            cellIndex === highlightedDay && "is-current-day",
                          ]
                            .filter(Boolean)
                            .join(" ")}
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
