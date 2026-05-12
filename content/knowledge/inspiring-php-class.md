---
title: 'Inspiring PHP クラス'
date: '2026-05-07T17:18:11+09:00'
draft: false
---

## Laravel に昔からある謎のコマンド

Laravel で、以下のコマンドを実行してみてください。  
bash:

```bash
php artisan inspire
```

実行のたびに、ランダムに名言が出力されるはずです。

なんのためにあるのかは、調べても分からなかったのですが、この機能は昔からあったそうです。  
今後も残るだろうと思っています。

当サイトでは、 Model などの使い方を学ぶときに、この機能を使います。

## 名言はどこにある？

`php artisan inspire` は、どうやって出力されているのでしょうか？

まず、以下のファイルを調べます。  
routes/console.php:

```php
<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
```

`\Illuminate\Foundation\Inspiring::quote()` を出力していることが分かります。

では、この Inspiring クラスはどこにあるのでしょうか？

`Illuminate` 名前空間の場所は、 [Illuminate を探す旅](/knowledge/where-is-illuminate-in-psr-4/) を参照してください。

Laravel のバージョンによって多少違うかもしれませんが、私の環境では、以下のファイルにありました。  
`/vendor/laravel/framework/src/Illuminate/Foundation/Inspiring.php`

## 名言の出力方法

内部の実装を読むと、以下のコマンドを呼び出せば、 Collection 型の名言の集合が得られます。

```php
$quotes = \Illuminate\Foundation\Inspiring::quotes();
```

以下は、その抜粋です。  
もし将来、この class が消えてしまったら、以下を使ってください。

```php
return new \Illuminate\Support\Collection([
    'Act only according to that maxim whereby you can, at the same time, will that it should become a universal law. - Immanuel Kant',
    'An unexamined life is not worth living. - Socrates',
    'Be present above all else. - Naval Ravikant',
    'Do what you can, with what you have, where you are. - Theodore Roosevelt',
    'Happiness is not something readymade. It comes from your own actions. - Dalai Lama',
    'He who is contented is rich. - Laozi',
    'I begin to speak only when I am certain what I will say is not better left unsaid. - Cato the Younger',
    'I have not failed. I\'ve just found 10,000 ways that won\'t work. - Thomas Edison',
    'If you do not have a consistent goal in life, you can not live it in a consistent way. - Marcus Aurelius',
    'It always seems impossible until it is done. - Nelson Mandela',
    'We must ship. - Taylor Otwell',
]);
```

## 名言だけの出力・偉人だけの出力

名言とそれを言った偉人は、 `-` で区切られているので、これで `explode()` すれば名言と偉人を分けられます。

```php
[$quote, $legend] = explode('-', 'We must ship. - Taylor Otwell');
$quote = trim($quote);
$legend = trim($legend);
```

Collection 型は、 `map()` メソッドが使えます。

```php
// 重複を除いた偉人の名前の集合
$legends = \Illuminate\Foundation\Inspiring::quotes()->map(function ($quote_legend){
    [$quote, $legend] = explode('-', 'We must ship. - Taylor Otwell');
    $legend = trim($legend);
    return $legend;
})->unique();
```

