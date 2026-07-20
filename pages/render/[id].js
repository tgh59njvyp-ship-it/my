// HTMLをレンダリングするページ
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Render() {
  const router = useRouter();
  const { id } = router.query;
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchHtml = async () => {
      try {
        const res = await fetch(`/api/htmls?id=${id}`);
        if (!res.ok) throw new Error('ファイル読み込みエラー');
        const data = await res.json();
        setHtml(data.html);
      } catch (error) {
        setHtml('<p style="color: red;">エラー: ファイルが見つかりません</p>');
      } finally {
        setLoading(false);
      }
    };

    fetchHtml();
  }, [id]);

  if (loading) return <div>読み込み中...</div>;

  return (
    <div>
      <iframe
        srcDoc={html}
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
        }}
      />
    </div>
  );
}
