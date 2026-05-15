---
title: 'ゲーテがすべてを言った'
date: '2026-05-10T14:11:54+09:00'
draft: false
weight: 500
params:
    subtitle: 'Relationship の基礎'
---

## 問題

以下のような、ゲーテの名言 API を作成してください。

- `/quotes/goethe` に GET リクエストを送ると、ユーザー名 `goethe` の名言が一覧で JSON 形式でレスポンスされる
- users テーブルに、初期値としてユーザー名 `goethe` を seeding しておく
- Quote （名言）モデル及び、 quotes テーブルを作成する
- User と Quote は、1対多（one to many）の関係。ユーザーは0以上複数の名言を発する可能性がある。すべての名言は、必ず1つのユーザーと結びつく
- quotes テーブルの初期値として、複数の名言を初期値として seeding しておく
- 初期値の名言はすべて、ユーザー `goethe` の発言として結びつける


{{< tdp-rgr >}}

## ヒント


<details>
<summary role="button" class="outline">背景知識</summary>

- JSON を出力する方法： [或るリクエストの一生](/knowledge/a-request-lifecycle/) のレスポンスオブジェクトの部分
- 名言を取得する方法： [Inspiring PHP クラス](/knowledge/inspiring-php-class/)

</details>

<details>
<summary role="button" class="outline">便利なアサーションの例</summary>

[アサーションの調べ方](/knowledge/assertions-list) も合わせてご覧ください。  
今回は、以下を使うのではないかと思います。

- {{< assertion "assertSame" >}}
- {{< assertion "assertJsonCount" >}}
- {{< assertion "assertSeeText" >}}

</details>

## 解答例

<details>
<summary role="button" class="secondary">続きを読む</summary>

実行環境：
- Laravel v13.9.0
- PHP 8.4
- PHPUnit

以下の手順で作成していきます。

1. 初期名言データ個数と、`Quote::all()` のデータの個数が同じか
1. 初期名言データ個数と、`goethe` と結びついた quotes データの個数が同じか
1. `/quotes/goethe` にアクセスして得られた JSON 内に、初期名言データの最初の名言が含まれているか

### （前準備）`Inspiring::quotes()->count()` で名言の数を数えておく

テストを作成します。  
bash:

```bash
php artisan make:test EverythingGoetheTest
```

tests/Feature/EverythingGoetheTest.php:

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Foundation\Inspiring;

class EverythingGoetheTest extends TestCase
{
    public function test_名言の数を数える(): void
    {
        $count = Inspiring::quotes()->count();
        var_dump($count);
        $this->assertTrue(true);
    }
}
```

私の環境では、 `int(41)` という数字が表示されました。  
以下、この数字に一致するかを確認していきます。

### Red1: 初期名言データ個数と、`Quote::all()` のデータの個数が同じか

テストを編集します。  
tests/Feature/EverythingGoetheTest.php:

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Quote;

class EverythingGoetheTest extends TestCase
{
    use RefreshDatabase;
    public function test_quote_allの数と同じか(): void
    {
        $this->seed();

        $count = Quote::all()->count();
        $this->assertSame(41, $count);
    }
}
```

失敗を確認します。

### Green1

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

class QuoteSeeder extends Seeder
{
    public function run(): void
    {
        Inspiring::quotes()->each(function (string $quote_author): void {
            $quote_string = trim(explode('-', $quote_author)[0]);
            Quote::factory()->create([
                'quote' => $quote_string,
            ]);
        });
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
            'user_id' => 1,  // goethe ユーザーは、最初に登録するので、 user_id は 1
        ];
    }
}
```

テストの成功を確認します。

### Refactor1

特にありません。

### Red2: 初期名言データ個数と、`goethe` と結びついた quotes データの個数が同じか

テストを追加します。  
tests/Feature/EverythingGoetheTest.php:

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class EverythingGoetheTest extends TestCase
{
    use RefreshDatabase;
    public function test_goetheの名言数と同じか(): void
    {
        $this->seed();

        $goethe = User::where('name', 'goethe')->first();
        $count = $goethe->quotes()->count();
        $this->assertSame(41, $count);
    }
}
```

失敗を確認します。

### Green2

User モデルに、 Quote モデルを紐づけます。  
app/Models/User.php:

```php
use Illuminate\Database\Eloquent\Relations\HasMany;
...
    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class);
    }
```

なお、 Quote モデルと User モデルは、同じ namespace なので、use の必要がありません。

この時点で、テストは成功します。

### Refactor2

テストは成功するのですが、 User 側から紐づいていて、 Quote 側から紐づいていないのは、誤解のもとなので、 Quote 側も編集しておきます。  
app/Models/Quote.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Quote extends Model
{
    /** @use HasFactory<\Database\Factories\QuoteFactory> */
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
```

ユーザー側からは、 `quotes` （複数形）ですが、名言側からは `user` （単数形）であることに注意してください。  
1人のユーザーに複数の名言が紐づく可能性がありますが、1つの名言には必ず1人のユーザーしか紐づかないので、このような命名規則になっているようです。

### Red3: `/quotes/goethe` にアクセスして得られた JSON 内に、初期名言データの最初の名言が含まれているか

テストを追加します。  
tests/Feature/EverythingGoetheTest.php:

```php
    public function test_quotes_goetheにアクセスして名言が表示されるか(): void
    {
        $this->seed();

        $response = $this->get('/quotes/goethe');
        // これは、名言リストの最初の1つです。どれを選んでも OK です。
        $quote = 'Act only according to that maxim whereby you can, at the same time, will that it should become a universal law.';

        $response->assertStatus(200)  // アクセスできるか
            ->assertJson([])          // json 形式か
            ->assertJsonCount(41, 'quotes')  // 個数が正しいか
            ->assertSeeText($quote);  // 名言があるか
    }
```

失敗を確認します。

### Green3

routing を作成します。  
route/web.php:

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

use App\Models\User;

class GoetheApiController extends Controller
{
    public function index(): array
    {
        $goethe = User::where('name', 'goethe')->first();
        return [
            'quotes' => $goethe->quotes,
        ];
    }
}
```

### Refactor3

特にありません。

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

### リレーションとは

データを保存するとき、伝統的にテーブル（表）形式で保存する方法が採用され、重複を省く（正規化する）ために、テーブルどうしのリレーションという方法が生まれました。

それを管理してくれるのが、リレーショナル・データベース管理システム（RDBMS）で、 MySql や、 PostgreSQL などが有名です。  
Laravel で何も設定しない状態だと、 SQLite3 が使えます。

リレーショナル・データベースは、 SQL という言語でコードを書くのですが、 SQL の世界は、ちょっと特殊なようで、データを集合（Set）で管理します。  
おそらく内部的には、 B+木などのデータ構造を、手続き的に処理しているはずですが、 SQL では、それが抽象化されて集合的に扱えるようになっています。

詳しい内容は、書籍が何冊も出ているので、それらを読んでみることをおすすめします。  
ミックさんという方の本が、難易度別にいろいろあって、オススメです。

### Eloquent とは

大変ややこしいのですが、抽象化されている SQL を、もう一段階抽象化したものが、 ORM というもののようです。

どうしてこんな面倒なことになっているのか、歴史的経緯は分かりませんが、 ORM では、集合的な SQL を、オブジェクトとして利用できるように（つまりメソッドなどが使えるように）抽象化しています。  
そして、 Laravel で採用している ORM が、 Eloquent です。

今回の問題で見たように、 Eloquent では、テーブルどうしのリレーションを、 Model class で定義します。

- 1対1 だったら、 hasOne <=> belongsTo
- 1対多だったら、 hasMany <=> belongsTo

など、それぞれ関係性を定義できるようになっています。

本来、テーブルで表現しにくい階層構造のデータであっても、リレーションを適切に設定することで、 RDBMS がものすごいスピードでデータを取得してくれます。

テーブルの設計および、それらの利用方法は、ある意味バックエンドエンジニアの真骨頂となる部分でしょうから、ぜひ詳しくなりたいものです。

</details>

