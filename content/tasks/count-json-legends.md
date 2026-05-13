---
title: 'JSON の中で偉人を数える'
date: '2026-05-12T18:43:08+09:00'
draft: false
weight: 400
params:
    subtitle: 'Controller と Model の連携'
---

## 問題

`/api/legends/index` に GET リクエストを送ると、初期登録した偉人の名前の一覧を JSON 形式でレスポンスする偉人名リストアプリを作成してください。  
そして、その人数が初期データの数と等しいことを確認してください。

{{< tdp-rgr >}}

## ヒント


<details>
<summary role="button" class="outline">背景知識</summary>

- Laravel で JSON 形式を返す方法： [公式ドキュメントの HTTP Responses](https://laravel.com/docs/responses)
- 偉人たちの取得方法： [Inspiring php クラス](/knowledge/inspiring-php-class/)

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
- Laravel v13.8.0
- PHP 8.4
- PHPUnit

以下の順番にテストを試していきます。

1. 初期データ用 Seeder を作り、User::all() の数と偉人の数が等しいか
1. `/api/legends/index` にアクセスして、 JSON が返ってくるか
1. `/api/legends/index` にアクセスして、返ってきた JSON の個数が初期データの個数と同じか

### （前準備）Inspiring::quotes() で偉人一覧を作り、その重複しない数を調べる

人数が分かれば良いので、数字を表示したあと成功だけする Unit テストを作ります。  
bash:

```bash
php artisan make:test --unit InspiringTest
```

tests/Unit/InspiringTest.php:

```php
<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use Illuminate\Foundation\Inspiring;

class InspiringTest extends TestCase
{
    public function test_count_legends(): void
    {
        $count = Inspiring::quotes()->map(function(string $str):string {
            return trim(explode('-', $str)[1]);
        })->unique()->count();
        dump($count);
        $this->assertTrue(true);
    }
}
```

`dump()` メソッドで、数字が表示されるはずです。  
その後の `assertTrue(true)` は、当然成功します。

わたしの環境では、重複無しの人数は27人でしたので、以下、この数字を使います。

### Red1: 初期データ用 Seeder を作り、User::all() の数と偉人の数が等しいか

Feature テストを作ります。  
bash:

```bash
php artisan make:test JsonCountTest
```

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class JsonCountTest extends TestCase
{
    use RefreshDatabase;
    protected $seed = true;

    public function test_count_user_all(): void
    {
        $users = User::all();
        $this->assertSame(27, $users->count());
    }
}
```

users テーブルにはユーザーが入っていないので（もしくは、 Laravel デフォルトで1人入っているだけなので）テストは失敗します。

### Green1

seeder ファイルを作成し、DatabaseSeeder.php に登録します。  
bash:

```bash
php artisan make:seeder UserSeeder
```

database/seeders/UserSeeder.php:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Str;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $authors = Inspiring::quotes()->map(fn (string $str): string => trim(explode('-', $str)[1]))->unique();
        $authors_data = $authors->map(function (string $name):array
        {
            $now = now();
            $email = strtolower(str_replace(' ', '-', $name)) . '@example.com';
            $password = Str::random(60);  // ハッシュ済みデータという想定
            return [
                'name' => $name,
                'email' => $email,
                'password' => $password,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        });
        User::insert($authors_data->toArray());
    }
}
```

database/seeders/DatabaseSeeder.php:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            UserSeeder::class,
        ]);
    }
}
```

テストが成功することを確認します。

### Refactor1

特にありません。

### Red2: `/api/legends/index` にアクセスして、 JSON が返ってくるか

先ほどのテストに、メソッドを追加します。  
tests/Feature/JsonCountTest.php:

```php
```

### Green2

ルーティングを作成します。  
routes/web.php:

```php
use App\Http\Collections\LegendsController;
Route::get('/api/legends/index', [LegendsController::class, 'index']);
```

bash:

```bash
php artisan make:controller LegendsController
```

app\Http\Controllers\LegendsController.php:

```php
    public function index() {
        return [];
    }
```

テストを実行し、成功を確認します。

### Refactor2

特にありません。

### Red3: `/api/legends/index` にアクセスして、返ってきた JSON の個数が初期データの個数と同じか

テストを追加します。  
tests/Feature/JsonCountTest.php:

```php
    public function test_count_json_user(): void
    {
        $response = $this->get('/api/legends/index');
        $response->assertJson([]);
        $response->assertJsonCount(27, 'users');
    }
```

テストの失敗を確認します。

### Green3

コントローラーを編集します。  
app\Http\Controllers\LegendsController.php:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class LegendsController extends Controller
{
    public function index() {
        return ['users' => User::select('name')->get()];
    }
}
```

テストが成功することを確認します。

### Refactor3

特にありません。

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

### ファイルどうしの連携

細かいところ（たとえば JSON など）の新しい知識は必要なのですが、基本的には、これまでに学習した内容（ルーティング、コントローラー、モデル、シーダー）の組み合わせ問題です。

特に、中心となる処理（ルーティングから、コントローラー、モデルへと処理が移っていくところ）をイメージしながら実装できれば、完璧です。


</details>

