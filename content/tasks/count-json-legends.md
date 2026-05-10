---
title: 'json の中で偉人を数える'
date: '2026-05-10T13:43:08+09:00'
draft: false
weight: 400
params:
    subtitle: 'Controller と Model の連携'
---

## 問題

以下のような、偉人名リスト API を作成してください。

- エンドポイント `/api/legends/index` への GET リクエストに対して、登録済みの偉人の名前の一覧を json 形式でレスポンスしてください
- 初期データは、 `Illuminate\Foundation\Inspiring::quotes()` の偉人名の部分を抽出し、データベースの users テーブルに seeding してください

データベースのデータ数と、レスポンスされた json に記載されている偉人名の数が一致していることを確かめてください。

{{ tdp-rgr }}

## ヒント


<details>
<summary role="button" class="outline">用語の意味</summary>

- json: オブジェクトや配列などのデータ構造を、文字列で表現する軽量なデータ交換フォーマット。元は JavaScript の表記に由来しますが、現在は PHP 含め、多くのプログラミング言語で、読み書き可能です。

</details>

<details>
<summary role="button" class="outline">便利なアサーションの例</summary>

[アサーションの調べ方](/knowledge/assertions-list) も合わせてご覧ください。  
今回は、以下を使うのではないかと思います。

- 

</details>

## 解答例

<details>
<summary role="button" class="secondary">続きを読む</summary>

実行環境：
- Laravel v13.7.0
- PHP 8.4
- PHPUnit

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

</details>

