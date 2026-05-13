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

当サイトでは、 Seeder などの使い方を学ぶときに、この機能を使います。

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
    'It is never too late to be what you might have been. - George Eliot',
    'It is not the man who has too little, but the man who craves more, that is poor. - Seneca',
    'It is quality rather than quantity that matters. - Lucius Annaeus Seneca',
    'Knowing is not enough; we must apply. Being willing is not enough; we must do. - Leonardo da Vinci',
    'Let all your things have their places; let each part of your business have its time. - Benjamin Franklin',
    'Live as if you were to die tomorrow. Learn as if you were to live forever. - Mahatma Gandhi',
    'No surplus words or unnecessary actions. - Marcus Aurelius',
    'Nothing worth having comes easy. - Theodore Roosevelt',
    'Order your soul. Reduce your wants. - Augustine',
    'People find pleasure in different ways. I find it in keeping my mind clear. - Marcus Aurelius',
    'Simplicity is an acquired taste. - Katharine Gerould',
    'Simplicity is the consequence of refined emotions. - Jean D\'Alembert',
    'Simplicity is the essence of happiness. - Cedric Bledsoe',
    'Simplicity is the ultimate sophistication. - Leonardo da Vinci',
    'Smile, breathe, and go slowly. - Thich Nhat Hanh',
    'The only way to do great work is to love what you do. - Steve Jobs',
    'The whole future lies in uncertainty: live immediately. - Seneca',
    'Very little is needed to make a happy life. - Marcus Aurelius',
    'Waste no more time arguing what a good man should be, be one. - Marcus Aurelius',
    'Well begun is half done. - Aristotle',
    'When there is no desire, all things are at peace. - Laozi',
    'Walk as if you are kissing the Earth with your feet. - Thich Nhat Hanh',
    'Because you are alive, everything is possible. - Thich Nhat Hanh',
    'Breathing in, I calm body and mind. Breathing out, I smile. - Thich Nhat Hanh',
    'Life is available only in the present moment. - Thich Nhat Hanh',
    'The best way to take care of the future is to take care of the present moment. - Thich Nhat Hanh',
    'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less. - Maria Skłodowska-Curie',
    'The biggest battle is the war against ignorance. - Mustafa Kemal Atatürk',
    'Always remember that you are absolutely unique. Just like everyone else. - Margaret Mead',
    'You must be the change you wish to see in the world. - Mahatma Gandhi',
    'It always seems impossible until it is done. - Nelson Mandela',
    'We must ship. - Taylor Otwell',
]);
```

## 名言だけの出力・偉人だけの出力

名言とそれを言った偉人は、 `-` で区切られているので、これで `explode()` すれば名言と偉人を分けられます。

```php
[$quote, $legend] = explode('-', 'We must ship. - Taylor Otwell');
$quote = trim($quote);  // We must ship.
$legend = trim($legend);  // Taylor Otwell
```

Collection 型は、 `map()` メソッドが使えます。  
これを利用して、たとえば以下のように、偉人名だけを取り出し、重複を省くことができます：

```php
// 重複を除いた偉人の名前の集合
$legends = \Illuminate\Foundation\Inspiring::quotes()->map(fn($str) => trim(explode('-', $str)[1]))->unique();
```

