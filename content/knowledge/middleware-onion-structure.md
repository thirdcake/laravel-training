---
title: 'ミドルウェアの玉ねぎ構造'
date: '2026-05-10T15:47:16+09:00'
draft: false
---


## ミドルウェアとは

ミドルウェア（Middleware）とは、ミドル（中間）にあるソフトウェアのことです。  
Laravel （正確に言うと、PHP のフレームワーク有識者たちが決めた PSR-15）では、外部からのリクエスト処理と中心処理（コントローラー）の間、及び中心処理からレスポンスを返す処理の間の2か所で、処理されます。

その構造は特徴的で、「玉ねぎ構造」と呼ばれます。

このページでは簡単に、その構造を確認してみます。

## log の確認方法

まず、ログが確認できるかどうか、確認します。

次のようなルーティングファイルを作成してください。  
routes/web.php:

```php
Route::get('/onion', function () {
    Log::debug('onion log test');
    return 'onion test';
});
```

そして、これにアクセスする Feature テストを用意します。  
bash:

```bash
php artisan make:test OnionStructureTest
```

テストを書きます。  
./tests/Feature/OnionStructureTest.php:

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;

class OnionStructureTest extends TestCase
{
    public function test_make_sure_laravel_log(): void
    {
        $response = $this->get('/onion');
        $response->assertStatus(200);
    }
}
```

テストは成功するはずです。テストの実行後、ログファイルを確認してください。  
storage/logs/laravel.log:

`onion log test` という文字列が、見つかれば、成功です。

> [!Note]
> もしログファイルが無い場合、ログファイルはあるが、文字列が見つからない場合は、ログの設定が初期設定とは違うのかもしれません。
> [公式ドキュメント](https://laravel.com/docs/logging) などを見直してください。
> ログを出力する場所、テスト時にログを出力する場所、出力するログのレベルなどを中心に見てみてください。

## ミドルウェアの作成

以下の通り、ミドルウェアを作成します。  
bash:

```bash
php artisan make:middleware OutsideOnionMiddleware
php artisan make:middleware InsideOnionMiddleware
```

ミドルウェアファイルを編集します。  
内外（Outside/Inside）及び前後（before/after）が分かるようにログを出力します。  
app/Http/Middleware/OutsideOnionMiddleware.php:

```php
use Illuminate\Support\Facades\Log;
...
    public function handle(Request $request, Closure $next): Response
    {
        Log::debug('Outside: before');
        $response = $next($request);
        Log::debug('Outside: after');
        return $response;
    }
```

app/Http/Middleware/InsideOnionMiddleware.php:

```php
use Illuminate\Support\Facades\Log;
...
    public function handle(Request $request, Closure $next): Response
    {
        Log::debug('Inside : before');
        $response = $next($request);
        Log::debug('Inside : after');
        return $response;
    }
```

## ミドルウェアの登録

ルーティングに登録します。  
routes/web.php:

```php
use App\Http\Middleware\OutsideOnionMiddleware;
use App\Http\Middleware\InsideOnionMiddleware;

Route::get('/onion', function() {
    Log::debug('onion log test');
    return 'onion test';
})->middleware([
    OutsideOnionMiddleware::class,
    InsideOnionMiddleware::class,
]);
```

このとき、ミドルウェアの登録の順番は重要です。  
上記のように、 Outside -> Inside の順に並べていることを確認してください。

## ログの確認

テストを実行してください。  
テストが成功すれば、ログファイルに以下のようなログが出力されるはずです。

```txt
[日付・時間] testing.DEBUG: Outside: before
[日付・時間] testing.DEBUG: Inside : before
[日付・時間] testing.DEBUG: onion log test
[日付・時間] testing.DEBUG: Inside : after
[日付・時間] testing.DEBUG: Outside: after
```

前処理は、Outside -> Inside と、順番通りであり、後処理は、 Inside -> Outside と、逆順になっていることが分かりました。

これが、玉ねぎの皮のように見えるというミドルウェアの構造です。
