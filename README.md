# 学習記録アプリ v2

学習時間を記録・管理するためのWebアプリケーションです。学習内容とかかった時間を登録し、合計時間を可視化することができます。

## デモ

[https://study-recods-app-v2.web.app](https://study-recods-app-v2.web.app)

## 機能

- 学習記録の追加
- 学習記録の削除
- 合計学習時間の表示
- 入力バリデーション
- リアルタイムデータベース連携（Supabase）

## 技術スタック

### フロントエンド

- **React** 19.2.4 - UIライブラリ
- **Vite** 8.0.4 - ビルドツール
- **styled-components** 6.4.1 - CSS-in-JS

### バックエンド

- **Supabase** 2.103.3 - PostgreSQLベースのBaaS

### テスト

- **Jest** 30.3.0 - テストフレームワーク
- **React Testing Library** 16.3.2 - コンポーネントテスト
- **@testing-library/user-event** 14.6.1 - ユーザーイベントシミュレーション

### デプロイ & CI/CD

- **Firebase Hosting** - ホスティング
- **GitHub Actions** - 自動デプロイパイプライン

## セットアップ

### 前提条件

- Node.js 20.x以上
- npm または yarn
- Supabaseアカウント

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/study-record-app-v2.git
cd study-record-app-v2

# 依存パッケージをインストール
npm install
```

### 環境変数の設定

プロジェクトルートに `.env` ファイルを作成し、以下の環境変数を設定してください：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:5173](http://localhost:5173) を開いてください。

## テスト

### テストの実行

```bash
# すべてのテストを実行
npm run test

# 特定のテストファイルを実行
npm run test -- StudyLogList.spec.jsx

# ウォッチモード
npm run test -- --watch
```

### テストカバレッジ

- タイトル表示のテスト
- フォーム入力と登録機能のテスト
- 削除機能のテスト
- バリデーションエラーのテスト

## ビルド

```bash
npm run build
```

ビルド成果物は `build/` ディレクトリに出力されます。

## デプロイ

### 自動デプロイ（推奨）

`main` ブランチにプッシュすると、GitHub Actionsが自動的に以下を実行します：

1. **Build** - アプリケーションをビルド
2. **Test** - テストを実行
3. **Deploy** - Firebase Hostingにデプロイ

テストが失敗した場合、デプロイはスキップされます。

### 手動デプロイ

```bash
# Firebase CLIをインストール
npm install -g firebase-tools

# ログイン
firebase login

# デプロイ
firebase deploy
```

## プロジェクト構造

```
study-record-app-v2/
├── .github/
│   └── workflows/
│       └── main.yml          # CI/CDパイプライン
├── public/                   # 静的ファイル
├── src/
│   ├── tests/
│   │   └── StudyLogList.spec.jsx  # コンポーネントテスト
│   ├── utils/
│   │   └── supabaseFunctions.js   # Supabase関数
│   ├── index.jsx             # エントリーポイント
│   ├── StudyLogList.jsx      # メインコンポーネント
│   └── styles.css            # グローバルスタイル
├── .env                      # 環境変数（gitignore）
├── jest.config.mjs           # Jest設定
├── jest.setup.js             # Jestセットアップ
├── .babelrc                  # Babel設定
├── vite.config.js            # Vite設定
└── package.json              # 依存関係
```

## 開発

### Linting

```bash
npm run lint
```

### プレビュー

```bash
npm run preview
```

## Supabaseテーブル定義

```sql
CREATE TABLE study_records (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  time INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### コミットメッセージ規約

- `feat:` - 新機能
- `fix:` - バグ修正
- `test:` - テストの追加・修正
- `ci:` - CI/CD設定の変更
- `docs:` - ドキュメントの変更
- `refactor:` - リファクタリング

## ライセンス

このプロジェクトはプライベートプロジェクトです。

## 参考リンク

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Supabase](https://supabase.com/)
- [Firebase](https://firebase.google.com/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
