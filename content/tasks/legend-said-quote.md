---
title: '偉人は名言を言った'
date: '2026-05-15T17:55:28+09:00'
draft: false
weight: 550
params:
    subtitle: 'Routing Model の基礎'
---

## 問題

以下のような、名言 API を作成してください。

- `/quotes/{user_id}` に GET リクエストを送ると、ユーザーID が `user_id` に等しい偉人の名言が一覧で JSON 形式でレスポンスされる
- users テーブルに、初期値として偉人名を seeding しておく
- Quote （名言）モデル及び、 quotes テーブルを作成する
- User と Quote は、1対多（one to many）の関係。ユーザーは0以上複数の名言を発する可能性がある。すべての名言は、必ず1つのユーザーと結びつく
- quotes テーブルの初期値として、複数の名言を初期値として seeding しておく
- 初期値の名言はそれぞれ、各偉人ユーザーの発言として結びつける

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

> [!Note]
> 私の環境の Inspiring::quotes() では、Laozi（老子）の名言が2つあったので、これを数え、その2つが表示されているかを試すことにしました。  
> 誰の名言をテストするかは、お使いの環境ごとに、調整してください。  
> また、存在しない偉人をテストするのも良いと思います。  
> Inspiring クラスの内容は、 [Inspiring PHP クラス](/knowledge/inspiring-php-class/) をご覧ください。

### （前準備）老子の id 番号と名言の個数を確認する

テストを作成します。  
bash:

```bash
php artisan make:test LaoziQuotesTest
```

tests/Feature/LaoziQuotesTest.php:

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Foundation\Inspiring;

class LaoziQuotesTest extends TestCase
{
    public function test_老子の情報を確認(): void
    {
        $laozi_index = Inspiring::quotes()->map(fn($s)=>trim(explode('-', $s)[1]))->unique()->search('Laozi') + 1;  // 0-index を 1-index に変えるために1を足す
        var_dump('老子のid 番号： ' . $laozi_index);

        $laozi_count = Inspiring::quotes()->map(fn($s)=>trim(explode('-', $s)[1]))->countBy()->all()['Laozi'];
        var_dump('老子の名言の個数： ' . $laozi_count);

        $this->assertTrue(true);
    }
}
```

上記のテストを実行し、老子の ID 番号が6, 名言数は2つであることを確認しました。  
Inspiring class を確認したところ、その2つとは、以下の通りでした：

- He who is contented is rich.
- When there is no desire, all things are at peace.

テストでは、これを確認します。

### Red: `/quotes/{Laozi（老子）のuser_id}` で、老子の名言の個数とその内容が出力されているか

テストを追加します。  
tests/Feature/LaoziQuotesTest.php:

```php
    use RefreshDatabase;
    public function test_老子の名言数と内容を確認(): void
    {
        $this->seed();
        $response = $this->get('/quotes/6');
        $response->assertStatus(200)
            ->assertJsonCount(2, 'quotes')
            ->assertSeeText('He who is contented is rich.')
            ->assertSeeText('When there is no desire, all things are at peace.');
    }
```

テストの失敗を確認します。

### Green

ルーティングを作成します。  
routes/web.php:

```php
use App\Http\Controllers\QuoteApiController;
Route::get('/quotes/{id}', [QuoteApiController::class, 'index']);
```

コントローラーを作成します。  
bash:

```bash
php artisan make:controller QuoteApiController
```

app/Http/Controllers/QuoteApiController.php:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class QuoteApiController extends Controller
{
    public function index(string $id): array 
    {
        $user = User::find($id);
        if(!$user) {
            abort(404);
        }
        return ['quotes' => $user->quotes];
    }
}
```

Quote Model, Migration, Factory, Seeder 各ファイルを作成します。  
bash:

```bash
php artisan make:model Quote -fms
```

マイグレーションを作成します。  
database/migrations/...create_quote_table.php:

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

シーダーを作成します。  
database/seeders/QuoteSeeder.php:

```php
    public function run(): void
    {
        Inspiring::quotes()->each(function (string $quote_author): void {
            [$quote, $author] = explode('-', $quote_author);
            $quote = trim($quote);
            $author = trim($author);
            $user = User::where('name', $author)->first();
            if(!$user) {
                $user = User::factory()->create(['name' => $author]);
            }
            Quote::factory()->create([
                'quote' => $quote,
                'user_id' => $user->id,
            ]);
        });
    }
```

database/seeders/DatabaseSeeder.php:

```php
    public function run(): void
    {
        $this->call([
            QuoteSeeder::class,
        ]);
    }
```

ファクトリーを作成します。  
database/factories/QuoteFactory.php:

```php
    public function definition(): array
    {
        return [
            'quote' => '名言',
            'user_id' => 1,
        ];
    }
```

モデルをリレーションさせます。  
app/Models/Quote.php:

```php
use Illuminate\Database\Eloquent\Relations\BelongsTo;
...
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
```

app/Models/User.php:

```php
use Illuminate\Database\Eloquent\Relations\HasMany;
...
    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class);
    }
```

### Refactor

上記の例では、 ルーティングで {id} を文字列で受け取り、 コントローラーで `User::where()` メソッドで探していますが、実はルーティングの時点で User を受け取ることが可能です。  
routes/web.php:

```php
Route::get('/quotes/{user}', [QuoteApiController::class, 'index']);
```

app/Http/Controllers/QuoteApiController.php:

```php
    public function index(User $user): array 
    {
        return ['quotes' => $user->quotes];
    }
```

ルートモデルバインディングというそうです。  
詳しくは、解説でまとめます。

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

### ルート・モデルバインディング

ルーティングに渡した変数を、コントローラーで（もしくはルーティングの第2引数に渡すコーラブルに） Model 型で渡すと、自動でインスタンスを見つけてくれる仕組みです。

Laravel [公式ドキュメント](https://laravel.com/docs/routing)には、次のような例が載っていました：

```php
use App\Models\User;
 
Route::get('/users/{user}', function (User $user) {
    return $user->email;
});
```

デフォルトでは、 id を探すようですが、ブログポストにおける slug カラムのように、別のカラムを利用することも可能のようです。  
（おそらく、 unique 制約などを付けるのだと思います）

```php
use App\Models\Post;
 
Route::get('/posts/{post:slug}', function (Post $post) {
    return $post;
});
```

</details>

