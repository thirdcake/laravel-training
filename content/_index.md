---
title: Home
---

## 特徴

すでにたくさんの Laravel 学習サイトがありますが、当サイトは、演習問題を解きながら Laravel に [テスト駆動入門](/knowledge/test-driven-primer/) するサイトです。

```php
<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Collection;
use You;

class LaravelTrainingTest extends TestCase
{
    /**
     * このサイトはあなたに適しているでしょうか？
     */
    public function test_this_site_is_suitable_for_you (): void
    {
        $traits = new Collection([
            'コマンドライン操作にそれほど恐怖感が無い',
            'デザインよりも、データ操作に興味がある',
            'エラーが全部解消された！ という達成感を楽しめる',
        ]);

        // ひとつでも当てはまれば True
        $isSuitable = $traits->contains(fn($trait) => You::have($trait));

        $this->assertTrue($isSuitable);
    }
}
```

## 環境構築

- Docker / Sail / Herd 要りません
- MySql / PostgreSQL 要りません

問題を解くだけなら Laravel のバージョンも問いません。

解答例と同じ出力にしたい場合は、その解答のバージョンに合わせてください。

当サイトオススメの環境構築方法を [こちらのページ](/knowledge/env-construction/) にまとめています。

## テストって難しいの？

実務のテスト駆動開発は、難しかったり、面倒だったりするかもしれません。  
しかし当サイトのテストは、難しくも面倒でもありません。

Laravel に入門するために、小さいテストを利用するだけのことです。  
そして Laravel には、テストできる環境が、最初から整っています。

詳しくは、 [こちらのページ](/knowledge/what-is-test/) にまとめています。

## 気楽に

Laravel 作者の Taylor Otwel さんも言っています。

> We must ship.

とりあえず出港してみる、くらいの気持ちで気軽に始めてください。  
最初の問題は、 [Hello World](/tasks/hello-world/) です。

