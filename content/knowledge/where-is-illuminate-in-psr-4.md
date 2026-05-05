---
title: 'Illuminate を探す旅'
date: '2026-05-05T11:30:07+09:00'
draft: false
---

この記事では、 `use Illuminate\Foundation\Inspiring;` を例として、対応する class の実際のコードを探します。

## 名前空間について

Laravel くらい大きなプログラムになると、関数名や class 名の衝突が問題になります。  
そこで、 namespace （名前空間）という仕組みを使って、同名の class を区別しています。

> [!Note]
> 名前空間は、PHP の機能ですが、 WordPress などでは見かけない概念なので、もし初めて知ったという方は、 PHP の入門書などを探してみてください。  
> Laravel 特有の機能ではないので、 Laravel の入門書には書いていない可能性があります。

たとえば、 `use Illuminate\Foundation\Inspiring;` という記述があったら、 Illuminate 名前空間の中にある、 Foundation 名前空間の中にある、 Inspiring という class を指しています。

これにより、他の名前空間内にある同名の Inspiring と区別されます。

この use 文以降、単に `Inspiring` と書けば、自動的に上記の class を指し示すという仕組みです。

## autoload について

また PHP には、 autoload という仕組みがあり、まだ読み込んでいない class を実行しようとしたとき、対応する class を自動で include してくれるようになっています。

PHP の autoload 機能に対して、「どの名前空間をどのディレクトリに対応させるか」というルールを定義したのが PSR-4 で、それを実際に動かしているのが Composer です。

## composer.json の PSR-4 について

Laravel のルートディレクトリに composer.json というファイルがあるはずなので、このファイルを開いてみてください。  
私の環境の Laravel では、次のような psr-4 が書かれていました。（抜粋です）

```json
{
    "autoload": {
        "psr-4": {
            "App\\": "app/",
        }
    },
}
```

この対応関係により、 `App\...` で始まる名前空間内の class が呼ばれたら、 `app/...` 内の class を探すようになっています。  
そして、ディレクトリの階層が、名前空間の階層と同じようにして探せるようになっています。

たとえば、 `use App\Http\Controllers\MyController;` という class は、 `app/Http/Controllers/MyController.php` を探すようになります。

> [!Note]
> なお、 `"App\\"` になっている理由は、 json 構文で、 `\` がエスケープ文字だからです。vs-code をお使いの方は、ひとつ `\` を消してみてください。構文エラーになるはずです。


## Illuminate はどこにあるのか？

ところが、上記に `Illuminate` 名前空間がありません。  
肝心の Illuminate は、どこから読み込まれているのでしょうか？

実はこれは、 `composer install` などでインストールした外部ライブラリの名前空間です。  
Composer の仕組みでは、 vendor ファイル内にあるすべてのライブラリの PSR-4 を、自動で読み込んでくれます。

よって、 vs-code などでは、普段は隠されている `vendor/` ディレクトリ以下を探してみてください。

Laravel は、たくさんのライブラリを読み込みますが、 Illuminate は、 `vendor/laravel/framework/composer.json` に書いてある以下の記述を読み込みます。（これも抜粋です）

```json
{
    "autoload": {
        "psr-4": {
            "Illuminate\\": "src/Illuminate/",
        }
    }
}
```

これにより、たとえば、 `use Illuminate\Foundation\Inspiring;` という呼び出しがあった場合は、 `vendor/laravel/framework/src/Illuminate/Foundation/Inspiring.php` というファイルの `Inspiring` という class が自動で読み込まれることになります。


