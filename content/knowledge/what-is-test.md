---
title: 'テストについて'
date: '2026-05-04T19:04:28+09:00'
draft: false
---

このページでは、テストについて、簡単にまとめます。

## テストとは

プログラムを書いたとき、その動作が期待どおりかを確認することを「テスト」と呼びます。  
この確認を、自動で効率よく行うためのツールとして、PHPUnit や Pest といったテストフレームワークがあります。

### Laravel はテストを始めやすい

Laravel には最初から PHPUnit や Pest が使えます。  
`php artisan test` コマンドが用意されており、実行すると `tests/` ディレクトリ以下のテストファイルを、全自動でまとめてテストしてくれます。

ディレクトリやファイルを指定して、部分的にテストすることも可能です。  
bash:

```bash
php artisan test tests/Feature/Http/Controller/PostControllerTest.php
```

### テストの作り方

`php artisan make:test` コマンドで、テストのひな型を作ってくれます。  
テストディレクトリは、Laravel と同じ階層構造にしておくと、便利です。

```bash
# app/Http/Controllers/PostController.php の Feature テストを書きたい
php artisan make:test Http/Controllers/PostControllerTest
# => tests/Feature/Http/Controllers/PostControllerTest.php が作成される
```

```bash
# app/Model/UserModel.php の Unit テストを書きたい
php artisan make:test --unit Model/UserModelTest
# => tests/Unit/Model/UserModelTest.php が作成される
```

コマンドのヘルプはこちらで確認できます：

```bash
php artisan make:test --help
```

### PHPUnit

当サイトでは、 PHPUnit を使っています。  

PHPUnit には、いくつかの命名規約（ルール）があります。

1. ファイル名は、`XxxTest` のように、 Test で終わること
1. class 名は、ファイル名に合わせること（make:test で作っていれば、自動でそうなっています）
1. テストメソッドは、 `test` で始めること

比較的新しい書き方として、 `#[Test]` というアトリビュートを書く方法もあり、今後そちらがスタンダードになるかもしれません。  
その場合、メソッド名を test で始める必要はなくなります。

期待どおりかを判定するのは、アサーション（assertions）というメソッド群を使います。  
[アサーションの調べ方](/knowledge/assertions-list/) を参照してください。

## レッド・グリーン・リファクタリングとは

当サイトで表示される「Red」「Green」「Refactor」は、本来はテスト駆動開発（TDD）で使われる用語です。  
詳しくは、 [テスト駆動入門](/knowledge/test-driven-primer/) を参照してください。

