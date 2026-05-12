---
title: '偉人を数える'
date: '2026-05-08T10:29:31+09:00'
draft: false
weight: 350
params:
    subtitle: 'Seeding の基礎'
---

## 問題

Laravel デフォルトの users テーブルに、偉人名を初期登録してください。  
そして、 users テーブルにデータがその人数分登録されていることを確認してください。

{{< tdp-rgr >}}

## ヒント

<details>
<summary role="button" class="outline">背景知識</summary>

- 偉人たちの取得方法： [Inspiring php クラス](/knowledge/inspiring-php-class/)
- users テーブル： おそらく、 Laravel にデフォルトで入っているはずです

</details>

<details>
<summary role="button" class="outline">便利なアサーションの例</summary>

[アサーションの調べ方](/knowledge/assertions-list) も合わせてご覧ください。  
今回は、以下を使うのではないかと思います。

- {{< assertion "assertDatabaseCount" >}}

</details>

## 解答例

<details>
<summary role="button" class="secondary">続きを読む</summary>

実行環境：
- Laravel v13.7.0
- PHP 8.4
- PHPUnit

### Red

CountLegendsTest を作ります。  
bash:

```bash
php artisan make:test CountLegendsTest
```

tests/Feature/CountLegendsTest.php:

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Foundation\Inspiring;

class CountLegendsTest extends TestCase
{
    use RefreshDatabase;

    protected $seed = true;

    public function test_count_legends(): void
    {
        $authors = Inspiring::quotes()->map(function (string $quote_author):string 
        {
            [$quote, $author] = explode('-', $quote_author);
            $author = trim($author);
            return $author;
        });
        $unique = $authors->unique();  // もし重複があれば消す
        $this->assertDatabaseCount('users', $unique->count());
    }
}
```

bash:

```bash
php artisan test ./tests/Feature/CountLegendsTest.php
```

### Green

Seeder を作成します。  
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
        $authors = Inspiring::quotes()->map(function (string $quote_author): string
        {
            [$quote, $author] = explode('-', $quote_author);
            $author = trim($author);
            return $author;
        });
        $unique = $authors->unique();
        $authors_data = $unique->map(function (string $name):array
        {
            $now = now();
            $email = strtolower(str_replace(' ', '-', $name)) . '@example.com';
            $password = Str::random(60);
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

> [!Note]
> ちょっと長くなってしまいましたが、やっていることは複数のデータを insert しているだけです。  
> もちろん、 foreach で繰り返して、 `User::create([]);` で1つずつデータを渡しても問題ありません。  
> users テーブルのスキーマについては、 Users のマイグレーションファイルをご覧ください。

今回は、初期設定なので、 `database/seeders/DatabaseSeeder.php` に登録します。

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

テストを実行し、成功を確認してください。

### Refactor

特にありません。


</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

### データベース操作の種類 - DDL と DML

データベースには、テーブルを作ったり壊したりする処理と、そのテーブルにデータを出し入れ（CRUD）する処理があります。  
前者を DDL といい、後者を DML といいます。

以前書いたように、 DDL 操作の全履歴を残せるのが、 Laravel のマイグレーションの強みです。

一方、 DML （データの CRUD 操作）は、 web アプリサービスの中で処理されるものであり、それらをいちいち残しておくことは、あまり無さそうです。  
とはいえ、初期データや、マスタデータ、テストでのエッジケースなど、いくつかの場合、 DML を持っておきたい場合があります。  
これを残せる仕組みが、 Seeding です。

> [!Note]
> と、思っていたのですが、実際はマイグレーションファイルに、直接初期データを書く（DML操作をする）ことも、よくあるそうです。

### Seeding について

Seeding ファイル自体は、 `database/seeders/` ディレクトリ下に作られます。

その中で、 `database/seeders/DatabaseSeeder.php` だけは特別なものです。

```bash
php artisan migrate:fresh --seed
```

上記コマンドを実行した時、 `--seed` オプションで、初期データ用のシーダーを一斉に実行したい場合があります。  
このような場合に、 DatabaseSeeder.php ファイルに登録しておけば、それらが一斉に実行される仕組みです。

一方、個別に実行したい場合もあるかもしれません。  
そのような場合は、以下のようにコマンドを実行します。

```bash
php artisan db:seed UserSeeder
``` 


なお、今回は `Inspiring::quotes()` メソッドを利用したので、データはありましたが、ダミーデータを入れたい場合もあるでしょう。  
その場合は、ファクトリーという仕組みがあります。

今後、ファクトリーをテーマとした問題も予定しています。

### テストでの初期設定の実行

TestCase クラスの中で、以下のようにプロパティを設定することで、テスト時のセットアップ時に、初期設定（DatabaseSeeder）のシーディングを実行してくれます。

```php
class CountLegendsTest extends TestCase
{
    use RefreshDatabase;
    protected $seed = true;
    ...
}
```

また、テストの中で初期設定（DatabaseSeeder）に設定していない Seeder ファイルを実行したい場合もあるかもしれません。  
その際は、テストメソッドの中で、以下のように書きます。

```php
$this->seed(UserSeeder::class);
$this->assert...
```

</details>

