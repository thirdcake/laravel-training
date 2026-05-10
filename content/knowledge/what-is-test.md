---
title: 'テストについて'
date: '2026-05-10T09:04:28+09:00'
draft: false
---

このページでは、テストについて、簡単にまとめます。

## テストとは

プログラムを書いたとき、その動作が期待どおりかを確認することを「テスト」と呼びます。  
この確認を、自動で効率よく行うためのツールとして、PHPUnit や Pest といったテストフレームワークがあります。

## Laravel はテストを始めやすい

Laravel では、最初から PHPUnit や Pest が使えます。

基本的な手順は、次の通りです：

1. artisan コマンドでテストのひな型ファイルを作成する
1. テストファイルを編集する
1. テストを実行する

### Feature テストファイルの作り方

まずは、 Laravel の機能を使う Feature テストの作り方を覚えましょう。  
（慣れてきたら、ヘルプなどを使って Unit テストの方法も調べてください）

`php artisan make:test` コマンドで、テストのひな型を作ってくれます。  
テストディレクトリは、Laravel と同じ階層構造にしておくと、便利です。

```bash
# app/Http/Controllers/PostController.php の Feature テストを書きたい
php artisan make:test Http/Controllers/PostControllerTest
# => tests/Feature/Http/Controllers/PostControllerTest.php が作成される
```

テスト名には、名前を付けるときのルール（命名規約）があります。

- 大文字で始めてください
- 最後に `Test` を付けてください

上記のように、 PostControllerTest だったり、 UserTest だったり、 HelloTest だったりします。

このコマンドのヘルプは、以下で確認できます：

```bash
php artisan make:test --help
```

### Feature テストファイルの書き方

上記のコマンドで作成されたひな型のファイルは、 Laravel のバージョンによって、多少違うかもしれませんが、おおよそ以下のようになっているはずです。  
tests/Feature/ExampleTest.php:

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
```

- class名（`ExampleTest`）は、ファイル名に一致します
- メソッド名は、 `test_` で初めます
    - PHPUnit の命名規約です
    - ただし、最近は `#[Test]` アトリビュートを使う方法もあり、今後アトリビュートが主流になってくると、メソッドの命名規則は無くなるかもしれません
- テスト class は、 `Tests\TestCase` を extends します
- `Tests\TestCase->assertXxxx` というアサーションメソッドがたくさんあります
- `Tests\TestCase->get('/routing')` で `https://example.com/routing` にアクセスしたときのレスポンスに相当する `TestResponse` オブジェクトが得られます
    - `TestRequest` オブジェクトから、さまざまなアサーションメソッドが使えます

アサーションについては、 [アサーションの調べ方](/assertions-list/) も合わせてご確認ください。

データベースをセットアップすることも可能です。  
その場合は、 class の中で、 `use RefreshDatabase;` を利用します。

```php
class ExampleTest extends TestCase
{
    use RefreshDatabase;
    public function test...
}
```

### テストを実行する

以下のコマンドで、 `tests/` ファイル内のすべてのテストファイルを、全自動で実行することが可能です。

```bash
php artisan test
```

また、特定のディレクトリ内のテストファイルすべてを実行したり、特定のファイルだけを実行することも可能です。

```bash
php artisan test ./tests/Feature/
php artisan test ./tests/Feature/HelloTest.php
```

## レッド・グリーン・リファクタリングとは

当サイトで表示される `Red`, `Green`,`Refactor` とは、本来テスト駆動開発（TDD）で使われる用語です。  
簡単にいうと、以下の通りです：

- Red: テストを作成・実行し、失敗を確認する
- Green: 多少強引にでも、成功させる
- Refactor: 読みやすく書き換えたり、重複処理を整理したりする

詳しくは、 [テスト駆動入門](/knowledge/test-driven-primer/) を参照してください。

