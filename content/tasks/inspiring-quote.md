---
title: 'Inspiring Quote'
date: '2026-05-05T08:40:59+09:00'
draft: false
weight: 50
params:
    subtitle: 'Controller の基礎'
---

## 問題

`/inspire` にアクセスすると、ランダムに名言を出力する web アプリを作成してください。

1. Red: テストを作成し、失敗することを確認してください。
1. Green: テストを成功させてください。
1. Ref: リファクタリングしてください。

> [!Note]
> この問題は、 Laravel に昔から実装されている `php artisan inspire` 機能を利用するものです。  
> `use Illuminate\Foundation\Inspiring;` した上で、 `Inspiring::quotes()` で、 Collection 型の名言集が返されます。  
> 将来的に、 Laravel からこの機能が削除された場合は、以下の配列をコピーして使ってください。

<details>
<summary role="button" class="outline">配列</summary>

```php
[
    'Act only according to that maxim whereby you can, at the same time, will that it should become a universal law. - Immanuel Kant',
    'An unexamined life is not worth living. - Socrates',
    'Be present above all else. - Naval Ravikant',
    'Do what you can, with what you have, where you are. - Theodore Roosevelt',
    'Happiness is not something readymade. It comes from your own actions. - Dalai Lama',
    'He who is contented is rich. - Laozi',
];
```

</details>

## 解答例

<details>
<summary role="button" class="secondary">続きを読む</summary>

実行環境：
- Laravel v13.7.0
- PHP 8.4
- PHPUnit

### 事前準備

`/inspire` へのルーティングと、 `tests/Feature/InspiringTest.php` テストを作成し、テストを成功させておいてください。  
bash:

> [!Note]
> ルーティング部分が分からない場合は、 [Hello World](/tasks/hello-world/) を参照してください。

### Red

テストを書き、実行し、失敗を確認します。  
tests/Feature/InspiringTest.php

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Inspiring;
use Tests\TestCase;

class InspiringTest extends TestCase
{
    // こちらは true になっているという前提です
    public function test_inspire_response_200(): void
    {
        $response = $this->get('/inspire');
        $response->assertStatus(200);
    }

    public function test_inspiring_quote(): void
    {
        $response = $this->get('/inspire');
        $content = trim($response->getContent());
        $this->assertTrue(Inspiring::quotes()->contains($content));
    }
}
```

### Green

ルーティングファイルから、ランダムにレスポンスします。  
route/web.php:

```php
<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Inspiring;

Route::get('/inspire', function () {
    $quotes = Inspiring::quotes();
    $quote = $quotes->random();
    return $quote;
});
```

テストを実行し、成功を確認します。  
bash:

```bash
php artisan test ./tests/Feature/InspiringTest.php
```

### Ref

コントローラーを作ります。  
bash:

```bash
php artisan make:controller InspiringController
```

コントローラーファイルを編集します。  
app/Http/Controllers/InspiringController.php:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Inspiring;

class InspiringController extends Controller
{
    public function index()
    {
        $quotes = Inspiring::quotes();
        $quote = $quotes->random();
        return $quote;
    }
}
```

ルーティングをコントローラーに向けます。  
routes/web.php

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/inspire', [InspiringController::class, 'index']);
```

テストが成功することを確認します。  
bash:

```bash
php artisan test tests/Feature/InspiringTest.php
```

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

### Inspiring を調べる

`Illuminate\Foundation\Inspiring` の実装を探すには、 [Illuminate を探す旅](/knowledge/where-is-illuminate-in-psr-4/) をご覧ください。

私の環境では、 `Inspiring::quotes()` を実行すれば、 Collection 型の名言集を返すようでした。

### テストで使うメソッド

今回は、 Collection 型をすでに持っているので、 `Collection->contains()` メソッドで判定し、これが true になるかどうかを `assertTrue` で判定しました。

もし、 Array 型の配列だった場合は、 `assertContains()` メソッドを使うこともできるかもしれません。

### コントローラーについて

今回の Green の例のように、ルーティングに処理を書いてしまうことも可能ではあります。

しかし、ルーティングファイルには、ルーティングだけを書きたいです。  
今回は、たった3行の処理でしたが、たとえば100行の処理をするページが100種類あったら、それだけで1万行のファイルになってしまいます。  
そんなルーティングファイル、絶対にメンテナンスしたくないでしょう。

そこで、中心的な処理を書く場所として、コントローラーを作ります。

コントローラーは、処理の司令塔です。  
データベース処理から画面表示まで、さまざまな処理の指示を書く場所です。

今回の処理は、メソッドを呼び出すだけの簡単なものだったので、ここに直接書いています。  
将来、いろんな処理が出てきますので、その都度、読みやすいように整理していくことになります。

### ルーティングからコントローラーの呼び出し

```php
Route::get('/inspire', [InspiringController::class, 'index']);
```

この書き方は、最初ギョッとすると思うのですが、これは Laravel の特殊規約ではなく、 PHP の仕様上、このような書き方にするルールです。  
本当は（他のプログラミング言語なら）、こう書きたいはずです：

```php
// これは動きません！
Route::get('/inspire', InspiringController->index );
```

意味としては、「`/inspire` に GET リクエストが来たら、 `InspiringContoller->index()` を実行してください」ということです。

しかし、引数として関数やメソッドを渡すとき、 PHP では特殊な書き方をすることがあります。

- `fn($x)=>$x` や、 `function($x){return $x}` のような無名関数
- `'strlen'` のような、関数名の文字列
- 上記のような `[class名の文字列, メソッド名の文字列]` という配列（今回のケース）

ちなみに、 `InspiringController::class` というのは、その class の名前空間付き正式名称（今回の場合は `App\Http\Controllers\InspiringController`）を文字列として出力するだけの、静的メソッドです。  
つまりこれは、オブジェクトではなく、ただの文字列です。

> [!Note]
> なぜこのような書き方になるのか、興味がある方は、「PHP コールバック関数」「PHP Callable」「PHP 第一級オブジェクト 関数」などで調べると、背景知識が得られるかもしれません。

</details>

