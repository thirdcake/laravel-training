---
title: 'アサーションの調べ方'
date: '2026-05-07T20:57:30+09:00'
draft: false
---

当サイトで使うテストの場合、アサーションメソッドは、公式ドキュメントを探すのが速いです。  
よく使われるものや、実務上のテクニックは、「PHPUnit アサーション一覧」や「Laravel アサーション一覧」などで検索すると、ブログなどにまとめてくださっている方がいます。

## PHPUnit で定義されているもの

元々 PHPUnit で使えるものの一覧です。  
Pest を使っている場合も、Pest は PHPUnit の拡張なので、以下が使えます。

[公式ドキュメント](https://docs.phpunit.de/en/13.1/assertions.html)

バージョンが違う場合は、それぞれリンクを辿ってください。  
PHPUnit のバージョンは、 `composer.json` の `require-dev` の `phpunit/phpunit` で確認できます。

## Laravel で独自に定義されているもの

上記のほか、Laravel 独自に作られているアサーションもあります。

### HTTP テストで使われるもの

Illuminate\Testing\TestResponse クラスのメソッドとして使えます。

[公式ドキュメント](https://laravel.com/docs/http-tests)

### データベーステストで使われるもの

Feature テストの拡張（extends）元クラスのメソッドなので、Feature テストの中で `$this` のメソッドとして使えます。  

[公式ドキュメント](https://laravel.com/docs/database-testing)
