---
title: 'json の中で偉人を数える'
date: '2026-05-10T13:43:08+09:00'
draft: false
weight: 400
params:
    subtitle: 'Controller と Model の連携'
---

## 問題

`/api/legends/index` に GET リクエストを送ると、初期登録した偉人の名前の一覧を JSON 形式でレスポンスする偉人名リストアプリを作成してください。  
そして、その人数が初期データの数と等しいことを確認してください。

{{< tdp-rgr >}}

## ヒント


<details>
<summary role="button" class="outline">背景知識</summary>

- [JSON](https://www.php.net/manual/ja/book.json.php) （PHP マニュアル）
- 偉人たちの取得方法： [Inspiring php クラス](/knowledge/inspiring-php-class/)

</details>

<details>
<summary role="button" class="outline">便利なアサーションの例</summary>

[アサーションの調べ方](/knowledge/assertions-list) も合わせてご覧ください。  
今回は、以下を使うのではないかと思います。

- {{< assertion "assertJson" >}}
- {{< assertion "assertJsonCount" >}}

</details>

## 解答例

<details>
<summary role="button" class="secondary">続きを読む</summary>

実行環境：
- Laravel v13.7.0
- PHP 8.4
- PHPUnit

以下の順番にテストを試していきます。

1. 初期データ用 Seeder を作り、User::all() の数と偉人の数が等しいか
1. `/api/legends/index` にアクセスして、 JSON が返ってくるか
1. `/api/legends/index` にアクセスして、返ってきた JSON の個数が初期データの個数と同じか

### （前処理）Inspiring::quotes() で偉人一覧を作り、その重複しない数を調べる

人数が分かれば良いので、失敗だけする Unit テストを作ります。  
bash:

```bash
php artisan make:test --unit InspiringTest
```

tests/Unit/InspiringTest.php:

```php
```

テストを実行すると、失敗すると思いますが、「期待したものは0でしたが、実際はxxxでした」という記述が出てくるので、このxxxが、最終的に欲しい偉人の重複無しの人数です。  
わたしの環境では、27人でしたので、以下、この人数を使います。

### Red1: 初期データ用 Seeder を作り、User::all() の数と偉人の数が等しいか

### Green1

### Refactor1

### Red2: `/api/legends/index` にアクセスして、 JSON が返ってくるか

### Green2

### Refactor2

### Red3: `/api/legends/index` にアクセスして、返ってきた JSON の個数が初期データの個数と同じか

### Green3

### Refactor3

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

</details>

