---
title: 'ゲーテがすべてを言った'
date: '2026-05-10T14:11:54+09:00'
draft: false
weight: 500
params:
    subtitle: 'Relationship の基礎'
---

## 問題

以下の通り、ゲーテの名言 API を作成してください。

- エンドポイント `/quotes/goethe` に GET リクエストを送ると、ユーザー名 `goethe` の名言が一覧で JSON 形式でレスポンスされる
- users テーブルに、初期値としてユーザー名 `goethe` を seeding しておく
- Quote （名言）モデル及び、 quotes テーブルを作成する
- User と Quote は、1対多（one to many）の関係。ユーザーは0以上複数の名言を発する可能性がある。すべての名言は、必ず1つのユーザーと結びつく
- quotes テーブルの初期値として、複数の名言を初期値として seeding しておく
- 初期値の名言はすべて、ユーザー `goethe` の発言として結びつける

そのうえで、 `/quotes/goethe` にすべての初期データが出力されているか確認してください。

{{< tdp-rgr >}}

## ヒント


<details>
<summary role="button" class="outline">背景知識</summary>

- 名言を取得する方法： [Inspiring PHP クラス](/knowledge/inspiring-php-class/)

</details>

<details>
<summary role="button" class="outline">便利なアサーションの例</summary>

[アサーションの調べ方](/knowledge/assertions-list) も合わせてご覧ください。  
今回は、以下を使うのではないかと思います。

- {{< assertion "assertJson" >}}
- {{< assertion "assertJsonCount" >}}

</details>

## 解答例

<details>
<summary role="button" class="secondary">続きを読む</summary>

実行環境：
- Laravel v13.7.0
- PHP 8.4
- PHPUnit

以下の手順で作成していきます。

1. `/quotes/goethe` にアクセスして JSON 形式がレスポンスされるか
1. 初期名言データと、`Quotes::all()` のデータの個数が同じか
1. 初期名言データと、`goethe` （user_id = 1）と結びついた quotes データの個数が同じか
1. `/quotes/goethe` にアクセスして得られた JSON 内の名言データが、初期データの個数と同じか

### （前準備）`Inspiring::quotes()->count()` で名言の数を数えておく

Unit テストを作成しておきます。  
bash:

```bash
php artisan make:test --unit GoetheCountTest
```

tests/Unit/GoetheCountTest.php:

```php
<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use Illuminate\Foundation\Inspiring;

class GoetheCountTest extends TestCase
{
    public function test_count_quotes(): void
    {
        $quotes = Inspiring::quotes()->count();
        var_dump($quotes);
        $this->assertTrue(true);
    }
}
```

私の環境では、 `41` という数字が表示されました。  
以下、この数字に一致するかを確認していきます。

### Red1: `/quotes/goethe` にアクセスして JSON 形式がレスポンスされるか

テストを作ります。  
bash:

```bash
php artisan make:test GoetheCountTest
```

tests/Feature/GoetheCountTest.php:

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GoetheCountTest extends TestCase
{
    public function test_response_is_json(): void
    {
        $response = $this->get('/quotes/goethe');
        $response->assertJson([]);
    }
}
```

失敗を確認します。

### Green1

ルーティングを編集します。  
routes/web.php:

```php
use App\Http\Controllers\GoetheApiController;
Route::get('/quotes/goethe', [GoetheApiController::class, 'index']);
```

コントローラーを作成します。  
bash:

```bash
php artisan make:controller GoetheApiController
```

app/Http/Controllers/GoetheApiController.php:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GoetheApiController extends Controller
{
    public function index(): array
    {
        return ['test' => 'とりあえず何か返します'];
    }
}
```

テストが成功することを確認します。

### Refactor1

特にありません。

### Red2: 初期名言データと、`Quotes::all()` のデータの個数が同じか

テストを追加します。  
tests/Feature/GoetheCountTest.php:

```php
use App\Models\Quote;
...
    use RefreshDatabase;
    protected $seed = true;
    ...
    public function test_quote_all_count(): void
    {
        $quote_count = Quote::all()->count();
        $this->assertSame(41, $quote_count);
    }
```

失敗を確認します。

### Green2

Quote モデル及びマイグレーションファイル、シーダーファイル、ファクトリーファイルを作成します。  
bash:

```bash
php artisan make:model Quote -fms
```

マイグレーションファイルを編集します。  
database/migrations/...create_quotes_table.php:

```php
    public function up(): void
    {
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
            $table->text('quote');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }
```

シーダーファイルを編集します。  
database/seeders/QuotesSeeder.php:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Inspiring;
use App\Models\Quote;
use Illuminate\Database\Eloquent\Factories\Sequence;

class QuoteSeeder extends Seeder
{
    public function run(): void
    {
        $quotes = Inspiring::quotes()->map(fn($str) => ['quote' => trim(explode('-', $str)[0])]);
        Quote::factory()
            ->count($quotes->count())
            ->state(new Sequence(...$quotes))
            ->create();
    }
}
```

database/seeders/DatabaseSeeder.php:

```php
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // 以下は元からあったものを goethe に書き換えました
        User::factory()->create([
            'name' => 'goethe',
            'email' => 'goethe@example.com',
        ]);

        $this->call([
            QuoteSeeder::class,
        ]);
    }
}
```

ファクトリーファイルを編集します。
database/factorories/

```php
<?php

namespace Database\Factories;

use App\Models\Quote;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Quote>
 */
class QuoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'quote' => '名言',
            'user_id' => 1,
        ];
    }
}
```

### Refactor2

特にありません。

### Red3: 初期名言データと、`goethe` （user_id = 1）と結びついた quotes データの個数が同じか

テストを追加します。  
tests/Feature/GoetheCountTest.php:

```php

```

失敗を確認します。

### Green3

リレーションを作成します。  
app/Models/User.php:

```php
use Illuminate\Database\Eloquent\Relations\HasMany;
...
    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class);
    }
```

app/Models/Quote.php:

```php
use Illuminate\Database\Eloquent\Relations\BelongsTo;
...
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
```


テストを実行し、成功を確認します。

### Refactor3

特にありません。

### Red4: `/quotes/goethe` にアクセスして得られた JSON 内の名言データが、初期データの個数と同じか

テストを追加します。  
tests/Feature/GoetheCountTest.php:

```php
    public function test_goethe_response_count(): void
    {
        $response = $this->get('/quotes/goethe');
        $response->assertStatus(200);
        $response->assertJsonCount(41, 'quotes');
    }
```

失敗を確認します。

### Green4

コントローラーを編集します。  
app/Http/Controllers/GoetheApiController.php:

```php
use App\Models\Quote;
...
    public function index(): array
    {
        $quotes = Quote::where('user_id', 1)->get();
        return ['quotes' => $quotes];
    }
```

### Refactor4

特にありません。

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

### リレーションとは



</details>

