---
title: 'ランダムな名言'
date: '2026-05-05T08:40:59+09:00'
draft: false
weight: 50
params:
    subtitle: 'Controller の基礎'
---

## 問題

`/random` にアクセスすると、ランダムに名言を出力する web アプリを作成してください。

{{< tdp-rgr >}}

> [!Note]
> この問題は、 Laravel に昔から実装されている `php artisan inspire` 機能を利用すると実装が楽です。  
> [class Inspiring についてはこちら](/knowledge/inspiring-php-class/) 。

## ヒント

<details>
<summary role="button" class="outline">表示されている文字列を取得する</summary>

画面に表示される文字列を、テスト中で取得するには、 `TestResponse->getContent()` で可能です。

たとえば、 `https://example.com/` で表示される文字列を取得したい場合は、 Feature のテストメソッド中で以下を処理します：

```php
$response = $this->get('/');
$content = $response->getContent();
```

PHP の標準関数である `trim()` で、前後の空白を取り除いておくと使いやすいです。

</details>

<details>
<summary role="button" class="outline">Collection 型について</summary>

`\Illuminate\Foundation\Inspiring::quotes()` の返り値は、 `\Illuminate\Support\Collection` 型です。  
名言と偉人がセットになった文字列を要素として、 Collection 型で入っています。

Collection の中に、ある要素 `$value` が含まれているかどうかは、 `Collection->contains($value)` メソッドが使えます。

要素の中身の1つをランダムに取り出すには、 `$value = Collection->random()` メソッドが使えます。

</details>

<details>
<summary role="button" class="outline">便利なアサーションの例</summary>

[アサーションの調べ方](/knowledge/assertions-list) も合わせてご覧ください。  
今回は、以下を使うのではないかと思います。

- {{< assertion "assertTrue">}}
- {{< assertion "assertContains">}}

</details>


## 解答例

<details>
<summary role="button" class="secondary">続きを読む</summary>

実行環境：
- Laravel v13.7.0
- PHP 8.4
- PHPUnit

### Red: 表示内容が Quotes Collection に含まれるか

テストを書き、実行し、失敗を確認します。  
tests/Feature/InspiringTest.php

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Inspiring;
use Tests\TestCase;

class InspiringTest extends TestCase
{
    public function test_inspiring_quote(): void
    {
        $response = $this->get('/random');
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

Route::get('/random', function () {
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

### Refactor

ルーティングファイルでは、ルーティングのみを行いたいです。ほかの処理は、別に書きましょう。  
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
    public function random()
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

Route::get('/random', [InspiringController::class, 'random']);
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

### コントローラーについて

今回の Green の例のように、ルーティングに処理を書いてしまうことも可能ではあります。

しかし、ルーティングファイルには、ルーティングだけを書きたいです。  
今回は、たった3行の処理でしたが、たとえば100行の処理をするページが100種類あったら、それだけで1万行のファイルになってしまいます。  
そんなルーティングファイル、絶対にメンテナンスしたくないでしょう。

そこで、メイン処理を書く場所として、コントローラーを作ります。

コントローラーは、処理の司令塔です。  
データベース処理から画面表示まで、さまざまな処理の指示を書く場所です。

今回の処理は、メソッドを呼び出すだけの簡単なものだったので、ここに直接書いています。  
将来、いろんな処理が出てきますので、その都度、読みやすいように整理していくことになります。

### ルーティングからコントローラーの呼び出し

```php
Route::get('/inspire', [InspiringController::class, 'index']);
```

この書き方は、最初ギョッとすると思うのですが、これは Laravel 独自の規約ではなく、 PHP の仕様上、このような書き方にするルールです。  
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

