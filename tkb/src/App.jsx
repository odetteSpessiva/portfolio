import { useCallback, useEffect, useState } from "react";
import "./App.css";

const BASE_URL = "https://thptchuyen.hatinh.edu.vn";
const DISCOVERY_URL = `${BASE_URL}/hoc-tap/thoi-khoa-bieu`;

const CORS_PROXY = "https://api.allorigins.win/raw?url=";

function textContent(element) {
  return element.textContent.replace(/\s+/g, " ").trim();
}

async function fetchHtml(url) {
  if (
    import.meta.env.DEV ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    const target = new URL(url);
    const response = await fetch(
      `/school-api${target.pathname}${target.search}`,
    );
    if (!response.ok)
      throw new Error("Không thể kết nối tới máy chủ của trường.");
    return response.text();
  }

  try {
    const response = await fetch(url);
    if (response.ok) return response.text();
  } catch {
    // The school host does not allow direct requests from static hosting.
  }

  const proxyResponse = await fetch(`${CORS_PROXY}${encodeURIComponent(url)}`);
  if (!proxyResponse.ok)
    throw new Error("Không thể kết nối tới máy chủ của trường.");
  return proxyResponse.text();
}

async function fetchTimetable() {
  const discoveryDocument = new DOMParser().parseFromString(
    await fetchHtml(DISCOVERY_URL),
    "text/html",
  );
  const detailLink = discoveryDocument.querySelector(
    "section#section18 a[href]",
  );
  if (!detailLink) throw new Error("Không tìm thấy thời khóa biểu mới nhất.");

  const detailUrl = new URL(detailLink.getAttribute("href"), BASE_URL).href;
  const detailDocument = new DOMParser().parseFromString(
    await fetchHtml(detailUrl),
    "text/html",
  );
  const frame = detailDocument.querySelector("iframe#iframe18_18[src]");
  if (!frame) throw new Error("Không tìm thấy dữ liệu thời khóa biểu.");

  const frameUrl = new URL(frame.getAttribute("src"), detailUrl).href;
  const indexDocument = new DOMParser().parseFromString(
    await fetchHtml(frameUrl),
    "text/html",
  );
  if (!indexDocument.body)
    throw new Error("Không tìm thấy dữ liệu thời khóa biểu.");

  const tableUrl = new URL("tkb_class_19_0.html", frameUrl).href;
  const tableDocument = new DOMParser().parseFromString(
    await fetchHtml(tableUrl),
    "text/html",
  );

  const match = tableDocument.body.textContent.match(
    /TKB có tác dụng từ:\s*(\d{2}\/\d{2}\/\d{4})/,
  );
  const date = match ? match[1] : null;

  const table = tableDocument.querySelector("table.cls-tblTKB, table");
  if (!table) throw new Error("Dữ liệu thời khóa biểu không đúng định dạng.");

  const rows = [...table.querySelectorAll("tr")].map((row) =>
    [...row.querySelectorAll("th, td")].map(textContent),
  );
  rows[0][0] = "Tiết";
  const title = textContent(tableDocument.querySelector("p font"));
  const className = title.match(/lớp:\s*([^\-]+)/i)?.[1]?.trim() || "";

  return {
    rows,
    title: title || "Thời khóa biểu",
    className,
    date,
    source: tableUrl,
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
        <a className="back-link" href="../theguides/">
          the guides ↗
        </a>
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
              <p className="subtitle">{data.className} · {data.date}</p>
            </div>
            <button
              className="refresh"
              type="button"
              onClick={load}
              aria-label="Cập nhật thời khóa biểu"
            >
              ↻ <span>Cập nhật</span>
            </button>
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
