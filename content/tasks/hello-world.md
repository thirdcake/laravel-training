---
title: 'Hello World'
date: '2026-05-04T08:59:18+09:00'
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

作成されたテストファイルを編集します。  
tests/Feature/HelloTest.php:

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;

class HelloTest extends TestCase
{
    public function test_hello_world(): void
    {
        $response = $this->get('/hello');

        $response->assertSeeText('Hello World!');
    }
}
```

テストを実行します。  
bash:

```bash
php artisan test tests/Feature/HelloTest.php
```

テストが失敗し、赤い表示になることを確認します。  
（たくさんエラーが出てきて驚くかもしれませんが、それが普通なので先に進みます。）

### Green

ルーティングを作成します。  
routes/web.php:

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/hello', function () {
    return 'Hello World!';
});

```

テストを再度実行します。  
bash:

```bash
php artisan test tests/Feature/HelloTest.php
```

テストが成功し、緑色になったことを確認します。

### Refactor

今回は、文字列を返しただけなので、特に必要ありません。

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

### 環境構築について

知らない分野で、いきなり環境構築は難しいかもしれませんが、 Laravel 単体であれば、入門者でも比較的簡単に作成可能と思います。

当サイトでのオススメの構築方法は、 [環境構築について](/knowledge/env-constructure/) をお読みください。

### テストについて

テストに馴染みのない方も多いと思うので、 [テストについて](/knowledge/what-is-test/) というページに、簡単にまとめています。

### ルーティングについて

ルーティングは、 web アプリの入り口です。  
このファイルが、その後の処理の方向づけを決めます。

> [!Note]
> なお、その web アプリのすべてのルーティングを調べるには、 `php artisan route:list` というコマンドがあります。  
> 大変便利なコマンドです。

今回は、単に文字列を返すだけでしたが、実際の web アプリでは、そのようなことはほとんど無いだろうと思います。

コントローラーの基本的な作り方は、 [Inspiring Quote](/tasks/inspiring-quote/) へ進んでください。


</details>

