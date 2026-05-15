---
title: Home
---

```php
<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use Illuminate\Support\Collection;
use You;

class LaravelTrainingTest extends TestCase
{
    public function test_このサイトはあなたに適しているでしょうか (): void
    {
        $traits = new Collection([
            'コマンドライン操作にそれほど恐怖感が無い',
            'データベース設計やデータ操作に興味がある',
            'エラーが全部解消された！ という達成感を楽しめる',
        ]);

        // ひとつでも当てはまれば True
        $isSuitable = $traits->contains(fn($trait) => You::have($trait));

        $this->assertTrue($isSuitable);
    }
}
```

## 特徴

すでにたくさんの Laravel 学習サイトがありますが、当サイトは、演習問題を解きながら Laravel に [テスト駆動入門](/knowledge/test-driven-primer/) するサイトです。  
利用上の注意点などは、 [当サイトについて](/about/) をお読みください。

## 環境構築

あらゆるプログラミングの入門者にとって、最初の難関は、その環境構築です。

当サイトオススメの環境構築方法を [環境構築について](/knowledge/env-construction/) のページにまとめています。

とりえあず Composer さえ動けば、環境構築できると思いますので、多少、ハードルは低いと思います。

## テストって難しいの？

実務のテスト駆動開発は、難しかったり、面倒だったりするかもしれません。  
しかし当サイトのテストは、難しくも面倒でもありません。

Laravel に入門するために、小さいテストを利用するだけのことです。  
そして Laravel には、テストできる環境が、最初から整っています。

詳しくは、 [テストについて](/knowledge/what-is-test/) のページにまとめています。

## 気楽に

Laravel 作者の Taylor Otwel さんも言っています。

> We must ship.

とりあえず出港してみるくらいの気持ちで、気軽に始めてみてください。  
最初の問題は、 [Hello World](/tasks/hello-world/) です。

