// HTMLエディタページ
import { useState } from 'react';
import styles from '../styles/Editor.module.css';

export default function Editor() {
  const [html, setHtml] = useState('<h1>こんにちは！</h1>');
  const [id, setId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // 新規作成
  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/htmls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html }),
      });
      const data = await res.json();
      setId(data.id);
    } catch (error) {
      alert('作成エラー: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 編集
  const handleUpdate = async () => {
    if (!id) {
      alert('先に保存してください');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/htmls', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, html }),
      });
      if (res.ok) {
        alert('保存しました！');
      } else {
        alert('保存エラー');
      }
    } catch (error) {
      alert('保存エラー: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // URLをコピー
  const handleCopyUrl = () => {
    if (!id) return;
    const url = `${window.location.origin}/render/${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>🎨 HTMLレンダラー</h1>
        <p>HTMLコードを入力して、URLを発行しよう！</p>
      </div>

      <div className={styles.content}>
        <div className={styles.editorSection}>
          <h2>HTMLエディタ</h2>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="ここにHTMLコードを入力..."
            className={styles.textarea}
          />
          <div className={styles.buttonGroup}>
            <button onClick={handleCreate} disabled={loading} className={styles.btn}>
              💾 新規作成
            </button>
            <button onClick={handleUpdate} disabled={loading || !id} className={styles.btn}>
              ✏️ 編集を保存
            </button>
          </div>
        </div>

        <div className={styles.previewSection}>
          <h2>プレビュー</h2>
          {id && (
            <div className={styles.urlSection}>
              <input
                type="text"
                readOnly
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/render/${id}`}
                className={styles.urlInput}
              />
              <button onClick={handleCopyUrl} className={styles.copyBtn}>
                {copied ? '✅ コピー完了！' : '📋 URLコピー'}
              </button>
            </div>
          )}
          <iframe
            srcDoc={html}
            className={styles.preview}
            title="プレビュー"
          />
        </div>
      </div>
    </div>
  );
}
