---
title: '名言集には名言がある'
date: '2026-05-09T18:33:59+09:00'
draft: false
weight: 300
params:
    subtitle: 'Migration の基礎'
---

## 問題

名言を CRUD 操作するサイトを作ろうとしています。  
Quote （名言）に関する Eloquent モデルと、それに対応するテーブルを作ってください。  
次に、そのテーブルのスキーマに `quote` カラムがあることを確かめてください。


{{< tdp-rgr >}}

## ヒント

<details>
<summary role="button" class="outline">用語の意味</summary>

- データベーステーブルのスキーマ： データベーステーブルのカラム名や、制約などをまとめたもの

Laravel では、 `Illuminate\Support\Facades\Schema::hasColumn($table_name, $column_name)` で、`$table_name` テーブルに `$column_name` が存在するかどうかの真偽値を返します。

</details>

<details>
<summary role="button" class="outline">便利なアサーションの例</summary>

[アサーションの調べ方](/knowledge/assertions-list) も合わせてご覧ください。  
今回は、以下を使うのではないかと思います。

- {{< assertion "assertTrue" >}}

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

```php
<?php

namespace Tests\Feature\App\Models;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Schema;

class QuoteTest extends TestCase
{
    use RefreshDatabase;
    public function test_quotes_table_has_quote_column(): void
    {
        $this->assertTrue(Schema::hasColumn('quotes', 'quote'));
    }
}
```

```bash
php artisan test ./tests/Feature/App/Models/QuoteTest.php
```

### Green

Quote モデル及びそのテーブルを作成します。  
bash:

```bash
php artisan make:model Quote -m
```

マイグレーションファイルを編集します。  
`database/migrations/日付_数字_create_quotes_table.php`:

```php
    public function up(): void
    {
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
            $table->text('quote');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('quotes');
    }
```

テストを実行し、成功を確認します。

### Refactor

今回は、特にありません。

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

### マイグレーションファイルの書き方

マイグレーションファイルには、 `up()` メソッドと `down()` メソッドがあります。

`use RefreshDatabase;` のあるテストの実行時や、 `php artisan migrate:fresh --seed` を行うときに実行されるのが `up()` メソッドです。  
一方、 `php artisan migrate:rollback` 時に実行されるのが `down()` メソッドです。  
つまり、 `down()` メソッドは、 `up()` メソッドを無かったことにする操作を書きます。

今回の問題では、`up()` メソッドはテーブルを作成しますので、 `down()` メソッドでは、そのテーブルを削除するコマンドが書かれていると思います。（デフォルトのままです）

ただし、データベースには、単純な逆操作ができない操作もありますから、実装時は注意が必要です。

</details>

