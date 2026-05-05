---
title: 'テストについて'
date: '2026-05-04T19:04:28+09:00'
draft: false
---

このページでは、テストについて、簡単にまとめます。

## テストとは

プログラムを書いたとき、その動作が期待どおりかを確認することを「テスト」と呼びます。  
この確認を自動で効率よく行うためのツールとして、PHPUnit や Pest といったテストフレームワークがあります。

Laravel にはデフォルトで `php artisan test` コマンドが用意されており、実行すると `tests/` ディレクトリ以下のテストファイルをまとめて PHPUnit や Pest で実行します。

ファイルを指定して、個別にテストすることも可能です。  
bash:

```bash
php artisan test tests/Feature/app/Http/Controller/PostControllerTest.php
```

[Laravel のテストに関する公式ドキュメント](https://laravel.com/docs/testing) は、とても参考になります。

### Feature（機能）テストとUnit（単体）テスト

Feature テストは Laravel のブートストラップを起動させて行うテストです。  
一方、 Unit テストは、 Laravel を起動させず、特定のメソッドだけを個別にテストします。

Feature テストの方が、様々な依存関係を考慮した、詳しいテストができますが、処理に時間がかかります。  
一方、 Unit テストは、処理が早く終わるので、 DI など Unit テストしやすくする工夫が、いろいろ考案されています。

### PHPUnit

当サイトでは、 PHPUnit を使っています。  
とりあえず覚えておくべきことは、以下の通りです。

1. `php artisan make:test tests/path/to/test/file/XxxxTest.php` でテストの雛形を作れる
1. Feature テストは、 tests/Feature/ ディレクトリ下に、 Unit テストは、 tests/Unit/ ディレクトリ下に作成する
1. テストディレクトリは、 Laravel の構造に合わせると分かりやすい（app/Http/Controllers/ や、 app/Http/Models/ など）
1. テストファイル名は、 `Test.php` で終わる（PostControllerTest.php, UserModelTest.php など）
1. class 名も、 `Test` で終わる（自動作成していれば、ファイル名と同じになるはずです）
1. テストメソッドには、 `test_` で始める

最後のメソッド名については、 `#[Test]` アトリビュートを使う方法が、これから主流になるのかもしれません。  
その場合は、 `test_` で始める必要はなくなります。


## レッド・グリーン・リファクタリングとは

当サイトで表示される「Red」「Green」「Ref（Refactoring）」は、テスト駆動開発（TDD）で使われる用語です。  
詳しくは、「テスト駆動開発」（Kent Beck オーム社）などを参照してください。  
簡潔に説明すると、次のサイクルを繰り返します。

- 小さなテストを書く。
- テストを実行して失敗させる（赤表示）。
- テストが通るように実装し、再度実行して成功させる（緑表示）。
- 実装を整理・改善する（リファクタリング）。

このサイクルを繰り返して、プログラムを少しずつ拡張していきます。  
当サイトでは、それぞれ「テストを書く」「テストを緑にする」「実装をきれいにする」に対応した小問を用意しています。

