---
title: '偉人を数える'
date: '2026-05-08T10:29:31+09:00'
draft: false
weight: 350
params:
    subtitle: 'Seeding の基礎'
---

## 問題

Laravel デフォルトの users テーブルに、偉人名を初期登録してください。  
そして、 users テーブルにデータがその人数分登録されていることを確認してください。

1. Red: 小さいテストを作成し、失敗を確認してください
1. Green: テストを成功させてください
1. Refactor: 整理・整頓してください
1. 必要に応じて、1から3を繰り返してください

## ヒント

<details>
<summary role="button" class="outline">偉人たちの取得方法</summary>

Laravel に昔から実装されている `php artisan inspire` を利用してください。  
[class Inspiring についてはこちら](/knowledge/inspiring-php-class/) 。

`Inspiring::quotes()` で、名言と偉人の文字列を要素に持つ Collection が得られます。  
たとえば、以下のように偉人名を要素とする Collection を取得できます。

```php
// '名言 - 偉人名' の文字列の集合なので：
$authors = \Illuminate\Foundation\Inspiring::quotes()->map(function ($quote_author) => {
    [$quote, $author] = explode('-', $quote_author);
    $author = trim($author);
    return $author;
});
```

</details>

<details>
<summary role="button" class="outline">users テーブルについて</summary>

Laravel が最初から用意してくれるテーブルのひとつですが、もし用意されていない場合は、作成する必要があります。  
以下で作成できるはずです。  
bash:

```bash
php artisan make:model --migration --seeder UserModel
```

</details>


<details>
<summary role="button" class="outline">便利なアサーションの例</summary>

[アサーションの調べ方](/knowledge/assertions-list) も合わせてご覧ください。  
今回は、以下を使うのではないかと思います。

- Tests\TestCase->assertDatabaseCount($table_name, $number)（$table_name テーブルに $number 個のデータがあるか）

</details>

## 解答例

<details>
<summary role="button" class="secondary">続きを読む</summary>

実行環境：
- Laravel v13.7.0
- PHP 8.4
- PHPUnit

### Red1: users テーブルが存在するか

CountLegendsTest を作ります。  
bash:

```bash
php artisan make:test CountLegendsTest
```

tests/Feature/CountLegendsTest.php:

```php

```

### Green1

### Refactor1

### Red2: 

### Green2

### Refactor2



</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

### Model について

### Seeder について


</details>

