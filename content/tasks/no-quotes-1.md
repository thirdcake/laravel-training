---
title: '名言が無い1'
date: '2026-05-08T17:27:10+09:00'
draft: false
weight: 200
params:
    subtitle: 'Migration の基礎'
---

## 問題

名言を CRUD 操作するサイトを作ろうとしています。  
quotes （名言）に関するテーブルを作り、初期値として、そのデータの個数がゼロであることを確かめてください。

1. Red: 小さいテストを作成し、失敗を確認してください
1. Green: テストを成功させてください
1. Refactor: 整理・整頓してください
1. 必要に応じて、1から3を繰り返してください

## ヒント


<details>
<summary role="button" class="outline">言葉の意味</summary>

- CRUD 操作： データを作成、読取、更新、削除する操作のこと
- マイグレート： マイグレーションファイルを実行してデータベーステーブルを作成したり、テーブルの構成を変更したりすること
- マイグレーションファイル： データベーステーブルの設計図（詳しくは、下の解説をお読みください）

</details>

<details>
<summary role="button" class="outline">便利なアサーションの例</summary>

[アサーションの調べ方](/knowledge/assertions-list) も合わせてご覧ください。  
今回は、以下を使うのではないかと思います。

- `Tests\TestCase->assertDatabaseEmpty($table_name)` （`$table_name` テーブルが空であることを確認）

</details>

<details>
<summary role="button" class="outline">マイグレーションファイルの作成方法</summary>

bash:

```bash
php artisan make:migration create_xxx_table
```

> [!Note]
> 命名規則（ルール）として、 `create_xxx_table` とする必要があります。  
> xxx は、英語の複数形にするという規約（ルール）があります。  
> 今回は、 quotes というテーブルを作りたいので、 `create_quotes_table` になります。

</details>

<details>
<summary role="button" class="outline">マイグレート状況を確認する方法</summary>

以下のコマンドで、その時点のマイグレート状況を確認できます。  
bash:

```bash
php artisan migrate:status
```

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
php artisan make:test Database/Migrations/QuotesTest
```

tests/Feature/Database/Migrations/QuotesTest.php:

```php
<?php

namespace Tests\Feature\Database\Migrations;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QuotesTest extends TestCase
{
    use RefreshDatabase;
    public function test_there_are_no_quotes(): void
    {
        $this->assertDatabaseEmpty('quotes');
    }
}
```

bash:

```bash
php artisan test ./tests/Feature/Database/Migrations/QuotesTest.php
```

### Green

マイグレーション（テーブル設計）ファイルを作成します。  
bash:

```bash
php artisan make:migration create_quotes_table
```

テストを実行して、データベースが空であることを確認します。  
bash:

```bash
php artisan test ./tests/Database/Migration/QuotesTest.php
```

### Refactor

特にありません。

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

### マイグレーションについて

マイグレーションとは、上でも説明した通り、データベースの設計図です。  
`up()` メソッドにより、柔軟にテーブルを設計できます。

しかし、同じことは `CREATE TABLE quotes ...` と、生 SQL 文を実行してもできるはずです。

どうしてわざわざ、設計図であるマイグレーションファイルを作成する必要があるのでしょうか？

基本的なアイディアとしては、「確実に、全自動でそのテーブルの設計図を残す」ということです。

現状、動いているシステムのデータベーステーブルが、どのようなカラムで、どのような制約かは、最初にテーブルを作成したり、変更したときの SQL 文が、履歴として完全な形で残っている必要があります。

しかし、履歴管理を手動ですると、ミスが起こるかもしれません。

- その SQL が実行され、反映されたか
- 実行したのに、残っていない SQL 文が無いか
- いつ、どんな順番で実行されたか
- （Git で管理していれば）誰が実行したか

これを解決するには、 PHP ファイルで管理して、 Laravel で確認できるようにするのが良いでしょう。

さらに Laravel では、間違えたときの Rollback （`down()` メソッド）など、テーブルの操作は一通りできるようになっています。

Laravel においては、「データベースを生 SQL で触らない」というのは、鉄則になっているようです。

### マイグレートについて

上記の例では、テストを実行するので、マイグレートのコマンドは出てきませんでした。

作成したマイグレーションファイルの実行の様子を見てみましょう。
次のコマンドを、1行ずつ実行してみてください。  
bash:

```bash
php artisan migrate:status
php artisan migrate:fresh
php artisan migrate:status
```

- 1行目の status 表示で、マイグレートされていないマイグレーションファイルが分かります
- 2行目で、実際にマイグレートを実行します。`fresh` を付けると、すべてのデータが一旦削除され、マイグレートが順番に実行されます
- 3行目の status 表示で、1行目から変わっていることを確認してください

また、実務における運用として、常に以下のコマンドで再作成できるようにしておくと、データベース周りの運用が楽になるようです。  
詳しい説明は、 [こちらのブログ記事](https://no-hack-no.life/post/2025-10-30-laravel-api-resource-tutorial/) が参考になります。  
bash:

```bash
php artisan migrate:fresh --seed
```

### Refreshdatabase について

今回のテストでは、 class の中に `use Refreshdatabase;` が使われています。

この use 文によって、テスト内で `php artisan migrate:fresh` 同等の実行がなされます。

### モデルと一緒に作る

多くの場合、マイグレーションファイルは、 Eloquent モデルと一緒に作成すると思うので、そちらのコマンドも紹介しておきます。  
これは、 Model の問題で利用します。  
bash:

```bash
php artisan make:model Quote --migration
```

このコマンドで、`\App\Models\Quote` クラス（Eloquent モデル）と、 `create_quotes_table` マイグレーションファイルが、同時に作成できます。

> [!Note]
> `Quote` とコマンドに書くだけで、それを小文字にし、複数形にしたマイグレーションファイルを作成してくれます。  
> （たとえば、 Person => `create_people_table` のように、単純に末尾に `s` を付けるだけではない変換をしてくれます）

</details>

