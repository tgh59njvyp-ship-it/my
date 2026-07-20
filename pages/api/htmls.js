// HTMLを保存・取得するAPI
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

// dataディレクトリが存在しない場合は作成
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    // 新規作成またはHTMLを保存
    const id = Date.now().toString();
    const filePath = path.join(dataDir, `${id}.html`);
    
    try {
      fs.writeFileSync(filePath, req.body.html);
      res.status(200).json({ id, url: `/render/${id}` });
    } catch (error) {
      res.status(500).json({ error: 'ファイル保存エラー' });
    }
  } else if (req.method === 'PUT') {
    // HTMLを編集
    const { id, html } = req.body;
    const filePath = path.join(dataDir, `${id}.html`);
    
    try {
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'ファイルが見つかりません' });
      }
      fs.writeFileSync(filePath, html);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'ファイル更新エラー' });
    }
  } else if (req.method === 'GET') {
    // HTMLを取得
    const { id } = req.query;
    const filePath = path.join(dataDir, `${id}.html`);
    
    try {
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'ファイルが見つかりません' });
      }
      const html = fs.readFileSync(filePath, 'utf-8');
      res.status(200).json({ html });
    } catch (error) {
      res.status(500).json({ error: 'ファイル読み込みエラー' });
    }
  }
}
