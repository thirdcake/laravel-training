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

{{< tdp-rgr >}}

## ヒント


<details>
<summary role="button" class="outline">背景知識</summary>

- CRUD 操作： データを作成、読取、更新、削除する操作のこと
- Eloquent モデル： Laravel でデータベースを操作する class

</details>

<details>
<summary role="button" class="outline">便利なアサーションの例</summary>

[アサーションの調べ方](/knowledge/assertions-list) も合わせてご覧ください。  
今回は、以下を使うのではないかと思います。

- {{< assertion "assertCount" >}}

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

Eloquent とは、 Laravel に最初から入っているデータベース ORM です。  
Eloquent モデルにメソッドを実装し、そのメソッドをコントローラーから実行することで、データベース処理を実行します。

今回の問題では、内部実装をしませんでしたが、これからこのモデルをたくさん使います。

Eloquent によるデータベース操作は、生の SQL よりも遅いようです。  
それでもなお、 Eloquent モデルを使う理由は、その可読性の高さや、利用しやすさなのでしょう。

Eloquent の意味は、「雄弁な」とか「表現力の高い」という意味です。  
なので、 Laravel に慣れ親しむなら、 Eloquent を自在に操る必要があります。

外国語を学ぶ時と一緒で、たくさん読んで、使って、慣れていくのがよいと思います。

</details>

