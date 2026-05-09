---
title: '名言が無い2'
date: '2026-05-09T18:05:17+09:00'
draft: false
weight: 250
params:
    subtitle: 'Model の基礎'
---

## 問題

名言を CRUD 操作するサイトを作ろうとしています。  
Quote （名言）に関する Eloquent モデルと、それに対応するテーブルを作り、初期値として、そのデータの個数がゼロであることを確かめてください。

1. Red: 小さいテストを作成し、失敗を確認してください
1. Green: テストを成功させてください
1. Refactor: 整理・整頓してください
1. 必要に応じて、1から3を繰り返してください

## ヒント


<details>
<summary role="button" class="outline">モデルの作成方法</summary>

Eloquent モデルを作成するには、以下のコマンドを利用します。  
bash:

```bash
php artisan make:model Xxx
```

Xxx は、そのままモデルのクラス名になるので、大文字で始めます。  
今回の場合は、 Quote です。  
また、モデルは、英語の単数形で表します。

モデルと同時に、マイグレーションファイルも作成可能です。  
bash:

```bash
php artisan make:model Xxx --migration
```

`--migration` オプションは、短縮して `-m` とも書けます。

詳しくは、モデル作成のヘルプを見ると良いです。  
bash:

```bash
php artisan make:model --help
```

</details>

<details>
<summary role="button" class="outline">便利なアサーションの例</summary>

[アサーションの調べ方](/knowledge/assertions-list) も合わせてご覧ください。  
今回は、以下を使うのではないかと思います。

- `phpunit\TestCase->assertCount($int, $countable)`（ `$countable`の個数が `$int` に等しい）

</details>

## 解答例

<details>
<summary role="button" class="secondary">続きを読む</summary>

実行環境：
- Laravel v13.7.0
- PHP 8.4
- PHPUnit

### Red

テストを作成し、失敗を確認します。  
bash:

```bash
php artisan make:test App/Models/QuoteTest
```

tests/Feature/App/Models/QuoteTest.php:

```php
<?php

namespace Tests\Feature\App\Models;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Quote;

class QuoteTest extends TestCase
{
    use RefreshDatabase;
    public function test_there_are_no_quotes(): void
    {
        $quotes = Quote::all();
        $this->assertCount(0, $quotes);
    }
}
```

bash:

```bash
php artisan test ./tests/Feature/App/Models/QuoteTest.php
```

### Green

Model を migration ファイルと一緒に作ります。  
bash:

```bash
php artisan make:model Quote --migration
```

テストを実行し、通ることを確認します。  
bash:

```bash
php artisan test ./tests/Feature/App/Models/QuoteTest.php
```

### Refactor

今回は特にありません。

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

### Eloquent モデルについて



</details>

