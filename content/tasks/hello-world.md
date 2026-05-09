---
title: 'Hello World!'
date: '2026-05-07T08:59:18+09:00'
draft: false
weight: 10
params:
    subtitle: 'Routing の基礎'
---

## 問題

`/hello` にアクセスすると、 `Hello World!` が表示される web アプリを作成してください。

1. Red: 小さいテストを作成し、失敗を確認してください
1. Green: テストを成功させてください
1. Refactor: 整理・整頓してください
1. 必要に応じて、1から3を繰り返してください

## ヒント


<details>
<summary role="button" class="outline">環境構築</summary>

知らない分野で、いきなり環境構築は難しいかもしれませんが、 Laravel 単体であれば、入門者でも比較的簡単に作成可能と思います。

当サイトでのオススメの構築方法は、 [環境構築について](/knowledge/env-construction/) をお読みください。

</details>

<details>
<summary role="button" class="outline">テストについて</summary>

当サイトで使うレベルのテストについては、 [テストについて](/knowledge/what-is-test/) というページに、簡単にまとめています。

</details>

<details>
<summary role="button" class="outline">便利なアサーションの例</summary>

[アサーションの調べ方](/knowledge/assertions-list) も合わせてご覧ください。  
今回は、以下を使うのではないかと思います。

- TestResponse->assertStatus($code)（HTTPステータスコードが$codeに等しいか）
- TestResponse->assertSeeText($value)（テキストコンテンツに$valueが含まれるか）

</details>

<details>
<summary role="button" class="outline">ルーティングファイルの位置</summary>

ルーティングファイルは、 `routes/web.php` にあります。

</details>

## 解答例

<details>
<summary role="button" class="secondary">続きを読む</summary>

実行環境：
- Laravel v13.7.0
- PHP 8.4
- PHPUnit

> [!Note]
> この問題は、最初の問題なので、特に小さいステップで進めます。  
> ここまで細かくなくて良いよという方は、 Red2 から読んでください。

### Red1: `/hello` で HTTP ステータスコード200を返すか

いきなり `Hello World!` の文字列確認を試しても良いのですが、その前段の、 HTTP ステータスコード200（成功）を返すかどうかを、まずはテストしてみます。

Feature テストを作ります。  
bash:

```bash
php artisan make:test HelloTest
```

作成されたテストファイルを編集します。  
tests/Feature/HelloTest.php:

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;

class HelloTest extends TestCase
{
    public function test_response_code_200(): void
    {
        $response = $this->get('/hello');
        $response->assertStatus(200);
    }
}
```

`$response->assertStatus(200);` は、最初から書いてあると思うので、編集するのはメソッド名だけです。  
test で始めることを忘れないでください。

テストを実行します。  
bash:

```bash
php artisan test tests/Feature/HelloTest.php
```

テストが失敗し、赤い表示になることを確認します。  
（たくさんエラーが出てきて驚くかもしれませんが、それが普通なので先に進みます。）

### Green1

ルーティングを作成します。  
routes/web.php:

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/hello', function () {
    return 'この時点では、何を返しても良い';
});

```

テストを再度実行します。  
bash:

```bash
php artisan test tests/Feature/HelloTest.php
```

テストが成功し、緑色になったことを確認します。

### Refactor1

整理するところはありません。

### Red2: `Hello World!` を返すか

無事、`/hello` が表示されていることが確認できたので、次にその表示されている内容が `Hello World!` かどうかを判定するテストを書きます。

テストを書き加えます。  
tests/Feature/HelloTest.php:

```php
    public function test_hello_world(): void
    {
        $response = $this->get('/hello');
        $response->assertSeeText('Hello World!');
    }
```

テストの失敗を確認します。  
bash:

```bash
php artisan test tests/Feature/HelloTest.php
```

### Green2

ルーティングファイルを書き換えます。  
routes/web.php:

```php
Route::get('/hello', function () {
    return 'Hello World!';
});
```

テストの成功を確認します。  
bash:

```bash
php artisan test tests/Feature/HelloTest.php
```

> [!Note]
> 全部が緑になった！ という達成感を感じてくれたら、うれしいです。

### Refactor2

特に整理整頓の必要はありません。

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

### ルーティングについて

ルーティングは、 web アプリの入り口です。  
このファイルが、その後の処理の方向づけを決めます。

> [!Note]
> なお、その web アプリのすべてのルーティングを調べるには、 `php artisan route:list` というコマンドがあります。  
> 大変便利なコマンドです。

今回は、短い文字列を返すだけでしたが、実際の web アプリでは、そのようなことはほとんど無いだろうと思います。  
これから、処理が複雑になっていくので、その書き方を学んでいきます。

</details>

