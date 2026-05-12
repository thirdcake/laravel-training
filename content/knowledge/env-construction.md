---
title: '環境構築について'
date: '2026-05-04T17:47:51+09:00'
draft: false
---

> [!Note]
> このページの環境構築は、「No hack, no life.」というブログの [Laravelで理解するREST設計の基本 Eloquentとartisanが導く「正しい構造」](https://no-hack-no.life/post/2025-10-30-laravel-api-resource-tutorial/) という記事がとても参考になります。

## 当サイトの方針

当サイトで紹介している問題は、基本的に Apache などのサーバーを立ち上げたりせず、テストを行うだけです。  
よって、「できるだけ簡単に、素早く、素の Laravel をセットアップすること」を優先します。

- XAMPP / Docker / Sail / Herd 使いません
- MySQL / PostgreSQL 使いません（SQLite3 を使います）

必要なものは以下のとおりです。

- PHP（Laravel が動くバージョンが必要）
- Composer
- SQLite3
- Git（あると便利）
- VS Code（あると便利）
- WSL2（Windows の方は、おそらく必須）

## インストール方法

インストール方法は、生成 AI に教えてもらった方が楽かもしれません。  
Windows / Ubuntu:

```bash
apt-get install \
  composer \
  php \
  php-curl \
  php-sqlite3 \
  php-xml \
  sqlite3
```

> [!Note]
> 上記コマンドを実行するとき、パーミッションによっては、コマンドの冒頭に sudo が必要かもしれません。（私の場合は必要でした）

mac:

```bash
brew install \
  composer \
  php \
  sqlite3
```

## 環境の確認方法

以下のコマンドを、1行ずつ実行してみてください。  
bash:

```bash
php -v
composer -V
sqlite3 -version
```

それぞれ、バージョン番号が確認できたら、成功しています。

## Laravel のセットアップ

Laravel をインストールする方法は、いくつかあるようですが、上記のブログ記事を参考に、 composer create-project コマンドを利用します。  
bash:

```bash
composer create-project laravel/laravel your-project-name
cd your-project-name
```

【your-project-name】の部分は、ディレクトリ名として可能なものなら、自由に決められます。

## Git でバックアップ（必須ではないが便利）

この時点で、素の状態の Laravel を Git に覚えさせておくと、間違った編集をしてしまったときに元に戻せるので便利です。  
必須ではないのですが、もし Git がインストールされているなら、以下を実行してください：  
bash:

```bash
git init
git add .
git commit -m'init laravel'
```

なお、 git は、必ずしも GitHub などに push する必要はありません。  
間違った編集をしてしまって、どうしようもなくなったら、以下を実行すれば、最初の Laravel に戻せます。  
bash:

```bash
git restore .
```

ただし、ときどき、上記コマンドでも戻らないときがあります。  
もし戻らなくなってしまっても、大丈夫です。  
古い Laravel は削除して、再度、composer create-project してください。  
ダウンロードに数分かかりますが、また素の Laravel が得られます。  
bash:

```bash
cd ../
rm -rf your-old-laravel
composer create-project laravel/laravel your-new-laravel
cd your-new-laravel
```

## Laravel が動くかどうか確認

無事に Laravel がインストールされているか、確認します。  
artisan コマンドが動くかどうか、試してみましょう。  
bash:

```bash
php artisan --version
php artisan about
php artisan inspire
```

それぞれ、 Laravel のバージョン情報や、基本情報、ランダムな名言集などが表示されれば、成功です！


