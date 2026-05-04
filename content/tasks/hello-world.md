---
title: 'Hello World'
date: '2026-05-04T08:59:18+09:00'
draft: false
weight: 10
---

## 問題

`https://example.com/hello` にアクセスしたときに、 `Hello World!` が表示される web アプリを作成してください。

1. Red: `/hello` にリクエストしたら、 `Hello World!` を含む文字列がレスポンスされることを確認するテストを書き、テストの失敗を確認してください。
1. Green: テストを成功させてください。
1. Refactor: （必要に応じて）リファクタリングしてください。

## 解答例

<details>
<summary role="button" class="secondary">続きを読む</summary>

実行環境：
- Laravel v13.7.0
- PHP 8.4
- PHPUnit

### Red

feature テストを作ります。  
bash:

```bash
php artisan make:test HelloTest
```

テストを編集します。  
tests/Feature/HelloTest.php:

```php

```

テストを実行します。  
bash:

```bash
php artisan test tests/Feature/HelloTest.php
```

テストが失敗し、赤い表示になることを確認します。

### Green

ルーティングを作成します。  
routes/web.php:

```php

```

テストを実行します。  
bash:

```bash
php artisan test tests/Feature/HelloTest.php
```

テストが成功し、緑色になったことを確認します。

### Refactor

今回は、特に必要ありません。

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

### 環境構築について

いきなり、環境構築は難しいかもしれませんが、 Laravel 単体であれば、入門者でも比較的作成可能と思います。

当サイトでのオススメの構築方法は、 [環境構築について](/knowledge/env-constructure/) をお読みください。

### テスト作成について



</details>

